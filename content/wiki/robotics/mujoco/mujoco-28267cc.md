---
title: "Mujoco学习记录"
description: "从 Obsidian 同步的 Robotics 笔记。"
date: 2026-07-22
category: "Robotics"
tags: ["Robotics"]
type: wiki
draft: false
---
📖参考资料：
Mujoco官网：[MuJoCo 官方文档](https://mujoco.readthedocs.io/en/stable/overview.html)
学习连接: [MuJoCo 学习参考](https://github.com/Albusgive/mujoco_learning/tree/main)
学习视频链接[【教程】2025新版mujoco建模与仿真](https://www.bilibili.com/video/BV1wMdHYVEnx?vd_source=6bb9dc8d77886fc937032b139ad7debc)
# 一、环境安装

观看视频安装即可

# 二、搭建机器人模型

## 1. 使用SW转URDF,URDF转MJCF
- SW ->URDF
  详情请见Vinvi战队ROS2教程[ROS2机器人操作系统教程](https://www.sdutvincirobot.top/wiki/2023-12-30-ros2-tutorial/0900-ke-shi-hua-ping-tai-rviz2-yu-urdf-jian-mo-yu-yan#sw2urdf)
![901](/wiki-assets/pictures-pasted-image-20260721235907.png)

- URDF->MJCF
```bash
#调用
/mujoco安装路径/bin/compile /you_URDF_file_path  /MJCF_path
#示例
/home/xiaofang/Applications/mujoco-3.7.0/bin/compile /you_URDF_file_path  /MJCF_path
```

# 三、使用C++开发

## main 运行方式 
### 1. 使用官方的 bassic.cc
打开模型
```c++
//模型打开
char error[1000] = "Could not load binary model";

m = mj_loadXML("../models/car.xml", 0, error, 1000);
```

### 2. 使用AI改造的main.cc （更加简洁，只有基本的配置）
```c++
//maoi.cc

#include "simulator/simulator.h"
#include "control/control.h"

int main()

{

	Simulator sim;
	
	// 1. 加载模型
	if (!sim.load_model("../models/model.xml"))
	
	return 1;
	
	// 2. 初始化窗口和可视化
	if (!sim.init_visual(1200, 900, "WheelLeg Demo"))
	
	return 1;
	
	// 3. 设置相机跟踪
	sim.set_camera_track("base_link", 2.0);
	
	// 4. 初始化控制器（手柄/IMU/PID）
	CarController controller;
	
	controller.Init(sim.model(), sim.data());
	
	// 5. 进入主循环
	sim.run([&](mjModel* m, mjData* d) {
	
	controller.Main_Control_Update();
	
	});
	return 0;

}
```
`simulator.cpp`
```c++
#include "simulator/simulator.h"

#include <iostream>

  

Simulator::~Simulator()

{

// 确保 OpenGL 上下文活跃再释放 MuJoCo 渲染资源

if (window_) glfwMakeContextCurrent(window_);

if (visual_ready_) mjr_freeContext(&con_);

if (visual_ready_) mjv_freeScene(&scn_);

if (d_) mj_deleteData(d_);

if (m_) mj_deleteModel(m_);

if (window_) glfwDestroyWindow(window_);

// Linux + NVIDIA 下 glfwTerminate 可能崩溃，仅 macOS/Windows 调用

#if defined(__APPLE__) || defined(_WIN32)

if (window_) glfwTerminate();

#endif

}

  

// ==================== 模型加载 ====================

bool Simulator::load_model(const char* xml_path)

{

char error[1000] = "Could not load binary model";

m_ = mj_loadXML(xml_path, nullptr, error, sizeof(error));

if (!m_) {

std::cerr << "[ERROR] 模型加载失败: " << error << std::endl;

return false;

}

d_ = mj_makeData(m_);

return true;

}

  

// ==================== 可视化初始化 ====================

bool Simulator::init_visual(int width, int height, const char* title)

{

if (!glfwInit()) {

std::cerr << "[ERROR] GLFW 初始化失败" << std::endl;

return false;

}

  

window_ = glfwCreateWindow(width, height, title, nullptr, nullptr);

if (!window_) {

std::cerr << "[ERROR] 窗口创建失败" << std::endl;

return false;

}

  

glfwMakeContextCurrent(window_);

glfwSwapInterval(1);

  

// 通过 user pointer 绑定实例，供静态回调转发

glfwSetWindowUserPointer(window_, this);

  

// 注册回调

glfwSetKeyCallback(window_, key_cb);

glfwSetMouseButtonCallback(window_, mouse_cb);

glfwSetCursorPosCallback(window_, move_cb);

glfwSetScrollCallback(window_, scroll_cb);

  

// MuJoCo 可视化初始化

mjv_defaultCamera(&cam_);

mjv_defaultOption(&opt_);

mjv_defaultScene(&scn_);

mjr_defaultContext(&con_);

  

mjv_makeScene(m_, &scn_, 2000);

mjr_makeContext(m_, &con_, mjFONTSCALE_150);

  

visual_ready_ = true;

return true;

}

  

// ==================== 相机 ====================

void Simulator::set_camera_track(const char* body_name, double distance)

{

cam_.type = mjCAMERA_TRACKING;

cam_.trackbodyid = mj_name2id(m_, mjOBJ_BODY, body_name);

cam_.distance = distance;

}

  

// ==================== 主循环 ====================

void Simulator::run(std::function<void(mjModel*, mjData*)> update)

{

while (!glfwWindowShouldClose(window_))

{

// 仿真：每帧跑 1/60 秒

mjtNum sim_start = d_->time;

while (d_->time - sim_start < 1.0 / 60.0)

{

if (update) update(m_, d_);

mj_step(m_, d_);

}

  

// 渲染

mjrRect viewport = {0, 0, 0, 0};

glfwGetFramebufferSize(window_, &viewport.width, &viewport.height);

  

mjv_updateScene(m_, d_, &opt_, nullptr, &cam_, mjCAT_ALL, &scn_);

mjr_render(viewport, &scn_, &con_);

glfwSwapBuffers(window_);

glfwPollEvents();

}

}

  

// ==================== 键盘回调 ====================

void Simulator::on_key(int key, int act)

{

// 转发给外部处理器

if (key_handler_) key_handler_(key, act);

  

// Backspace 重置仿真

if (act == GLFW_PRESS && key == GLFW_KEY_BACKSPACE) {

mj_resetData(m_, d_);

mj_forward(m_, d_);

}

}

  

// ==================== 鼠标按键回调 ====================

void Simulator::on_mouse_button(int button, int act)

{

btn_left_ = (glfwGetMouseButton(window_, GLFW_MOUSE_BUTTON_LEFT) == GLFW_PRESS);

btn_middle_ = (glfwGetMouseButton(window_, GLFW_MOUSE_BUTTON_MIDDLE) == GLFW_PRESS);

btn_right_ = (glfwGetMouseButton(window_, GLFW_MOUSE_BUTTON_RIGHT) == GLFW_PRESS);

  

glfwGetCursorPos(window_, &lastx_, &lasty_);

}

  

// ==================== 鼠标移动回调 ====================

void Simulator::on_mouse_move(double xpos, double ypos)

{

if (!btn_left_ && !btn_middle_ && !btn_right_) return;

  

double dx = xpos - lastx_;

double dy = ypos - lasty_;

lastx_ = xpos;

lasty_ = ypos;

  

int width, height;

glfwGetWindowSize(window_, &width, &height);

  

bool shift = (glfwGetKey(window_, GLFW_KEY_LEFT_SHIFT) == GLFW_PRESS ||

glfwGetKey(window_, GLFW_KEY_RIGHT_SHIFT) == GLFW_PRESS);

  

mjtMouse action;

if (btn_right_) action = shift ? mjMOUSE_MOVE_H : mjMOUSE_MOVE_V;

else if (btn_left_) action = shift ? mjMOUSE_ROTATE_H : mjMOUSE_ROTATE_V;

else action = mjMOUSE_ZOOM;

  

mjv_moveCamera(m_, action, dx / height, dy / height, &scn_, &cam_);

}

  

// ==================== 滚轮回调 ====================

void Simulator::on_scroll(double xoffset, double yoffset)

{

mjv_moveCamera(m_, mjMOUSE_ZOOM, 0, -0.05 * yoffset, &scn_, &cam_);

}
```
`simulator.h`
```c++
#pragma once

#include <functional>
#include <mujoco/mujoco.h>
#include <GLFW/glfw3.h>

  

class Simulator {

public:

Simulator() = default;

~Simulator();

  

// 禁止拷贝

Simulator(const Simulator&) = delete;

Simulator& operator=(const Simulator&) = delete;

  

/** 加载模型，失败返回 false */

bool load_model(const char* xml_path);

  

/** 初始化窗口和可视化 */

bool init_visual(int width, int height, const char* title);

  

/** 设置相机跟踪的 body */

void set_camera_track(const char* body_name, double distance = 2.0);

  

/** 注册额外的按键回调（在 Backspace 重置之后调用） */

void set_key_handler(std::function<void(int key, int act)> handler) { key_handler_ = handler; }

  

/** 进入主循环，每帧调用 update(m, d) */

void run(std::function<void(mjModel*, mjData*)> update = nullptr);

  

/** 模型和数据访问 */

mjModel* model() { return m_; }

mjData* data() { return d_; }

  

private:

// 实例回调（由静态函数转发）

void on_key(int key, int act);

void on_mouse_button(int button, int act);

void on_mouse_move(double xpos, double ypos);

void on_scroll(double xoffset, double yoffset);

  

/** 获取当前 viewport */

mjrRect get_viewport();

  

// 静态 GLFW 回调，通过 user pointer 转发到实例

static void key_cb(GLFWwindow* w, int k, int s, int a, int m) {

auto* self = static_cast<Simulator*>(glfwGetWindowUserPointer(w));

self->on_key(k, a);

}

static void mouse_cb(GLFWwindow* w, int b, int a, int m) {

auto* self = static_cast<Simulator*>(glfwGetWindowUserPointer(w));

self->on_mouse_button(b, a);

}

static void move_cb(GLFWwindow* w, double x, double y) {

auto* self = static_cast<Simulator*>(glfwGetWindowUserPointer(w));

self->on_mouse_move(x, y);

}

static void scroll_cb(GLFWwindow* w, double xo, double yo) {

auto* self = static_cast<Simulator*>(glfwGetWindowUserPointer(w));

self->on_scroll(xo, yo);

}

  

bool visual_ready_ = false;

  

mjModel* m_ = nullptr;

mjData* d_ = nullptr;

  

mjvCamera cam_{};

mjvOption opt_{};

mjvScene scn_{};

mjrContext con_{};

GLFWwindow* window_ = nullptr;

  

// 外部回调

std::function<void(int, int)> key_handler_;

  

// 鼠标状态

bool btn_left_ = false, btn_middle_ = false, btn_right_ = false;

double lastx_ = 0, lasty_ = 0;

  

// 暂停 & 拖拽加力

bool paused_ = false;

bool perturb_active_ = false;

mjvPerturb pert_{};

};
```
### 3. 使用官方的simulator（拥有官方的simulator界面按钮）
1. 将simulator文件夹下的所有文件复制到自己的工程文件下面`src/`  除了`cmake/` 文件夹之外的文件
![598](/wiki-assets/pictures-pasted-image-20260721231329.png)
2. 更改`CMakeListst.txt`
```cmake
cmake_minimum_required(VERSION 3.20)
project(工程名 LANGUAGES CXX)

# C++17
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
# MuJoCo 安装目录（此处替换为自己的安装目录）
set(MUJOCO_PATH "/home/xiaofang/Applications/mujoco-3.7.0")

include_directories(
	${MUJOCO_PATH}/include
)

link_directories(
	${MUJOCO_PATH}/lib
)

set(MUJOCO_LIB
	${MUJOCO_PATH}/lib/libmujoco.so
)

# 官方 Simulator 源码
file(GLOB SIMULATOR_SRC
${CMAKE_CURRENT_SOURCE_DIR}/src/simulator/*.cc
)
# 用户控制代码
set(USER_SRC
src/control/control.cpp
src/control/pid.cpp
src/sensors/imu.cpp
)

# 最终程序
add_executable(WheelLeg
${SIMULATOR_SRC}
${USER_SRC}
)

target_include_directories(WheelLeg PRIVATE

${CMAKE_SOURCE_DIR}/include
${CMAKE_CURRENT_SOURCE_DIR}/src/simulator
${MUJOCO_PATH}/include

)

target_link_libraries(WheelLeg

${MUJOCO_LIB}
glfw
GL
GLU
)
```

3. 更改官方main.cc
```c++

void PhysicsLoop(mj::Simulate& sim) {
...
	#在这里面加入用户循环控制程序入口 例如
	carController.Main_Control_Update(m, d);
	mj_step(m, d);
...
}

void PhysicsThread(mj::Simulate* sim, const char* filename){
...

mj_forward(m, d);

//在这里加入用户控制器的初始化
carController.Init(m);

...
}


```
4. 启动方式 （此处使用fish）
新建 `scripts/run.fish` 写入以下内容
```bash
#!/usr/bin/env fish
cd ../build
echo "========== Build =========="

make

or begin

echo "编译失败"

exit 1

end

echo "========== Run =========="
#启动程序，设置环境变量以启用 NVIDIA GPU 的渲染加速

env \

__NV_PRIME_RENDER_OFFLOAD=1 \

__GLX_VENDOR_LIBRARY_NAME=nvidia \

MUJOCO_GL=egl \

../build/WheelLeg ../models/model.xml

```





## 问题专项
### 一、解决方针启动卡顿问题
（此处使用fish，bash等其他shell同理）
- 原因:没有使用nvidia显卡启动仿真
- 新建run.fish在里面写运行程序的脚本

```bash
#!/usr/bin/env fish
env \

__NV_PRIME_RENDER_OFFLOAD=1 \

__GLX_VENDOR_LIBRARY_NAME=nvidia \

MUJOCO_GL=glx \

../build/demo编译后生成的可执行文件
```
