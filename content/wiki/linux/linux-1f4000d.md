---
title: "我的Linux踩坑记"
description: "从 Obsidian 同步的 Linux 笔记。"
date: 2026-07-21
category: "Linux"
tags: ["Linux"]
type: wiki
draft: false
---
# **kubuntu系列**

## 1.安装软件

![738](https://sdutvincirobot.feishu.cn/space/api/box/stream/download/asynccode/?code=NzBhYzgzOTMwOTBlYjViZjM5Mzk2MWNhZTBhNDRhMzRfWHp2Q3RqYU1wUWUzZmo4Skk5Njk4c2Q3WGQ4ZVcyTklfVG9rZW46Q3piUWJGQmJTb3RoYUN4QnpqTmNwRUVqbmJoXzE3ODQ2NDc0NDU6MTc4NDY1MTA0NV9WNA&add_watermark=true&scene_type=CCM)

用 gdebi-gtk

卸载软件：

![612](https://sdutvincirobot.feishu.cn/space/api/box/stream/download/asynccode/?code=NjY2MjJiMTczNWY0NWUwZTNkMWU1NDU2OWNmODYzYjNfdTBQWmZPZ3VtVDU4WG1XaGZpSGVFN2pDRUpXaG9oRHVfVG9rZW46TXBDbWJVbVBnb2pEVHp4bHRVaWMzQ0JGbjRBXzE3ODQ2NDc0NDU6MTc4NDY1MTA0NV9WNA&add_watermark=true&scene_type=CCM)

## 2.代理问题（clash开隧道，记得开服务模式，直接解决）

- ~~W: 无法下载~~ ~~http://mirrors.sohu.com/ubuntu/dists/zesty/InRelease~~ ~~无法连接上 127.0.0.1:42165 (127.0.0.1)。 connect (111: 拒绝连接)~~
    

~~W: 无法下载~~ ~~http://mirrors.sohu.com/ubuntu/dists/zesty-updates/InRelease~~ ~~不能连接到 127.0.0.1：42165：~~

~~W: 无法下载~~ ~~http://mirrors.sohu.com/ubuntu/dists/zesty-backports/InRelease~~ ~~不能连接到 127.0.0.1：42165：~~

~~W: 无法下载~~ ~~http://mirrors.sohu.com/ubuntu/dists/zesty-security/InRelease~~ ~~不能连接到 127.0.0.1：42165：~~

- ~~W: 无法下载~~ ~~http://ppa.launchpad.net/diesch/testing/ubuntu/dists/zesty/InRelease~~ ~~无法连接上 127.0.0.1:42165 (127.0.0.1)。 connect (111: 拒绝连接)~~
    
- ~~W: 无法下载~~ ~~http://archive.ubuntukylin.com:10006/ubuntukylin/dists/xenial/InRelease~~ ~~无法连接上 127.0.0.1:42165 (127.0.0.1)。 connect (111: 拒绝连接)~~
    
- ~~W: 无法下载~~ ~~http://packages.microsoft.com/repos/vscode/dists/stable/InRelease~~ ~~无法连接上 127.0.0.1:42165 (127.0.0.1)。 connect (111: 拒绝连接)~~
    

~~W: 部分索引文件下载失败。如果忽略它们，那将转而使用旧的索引文件。~~

~~其实这是以为你的Linux中的代理网址还未消除，而你现在又为使用代理上网的原因，~~

~~好比这样，你下了一个vpn的软件，你只是在需要的时候使用他，所以在你使用过代理上网时，系统和就自动为你添上了代理上网的设置，HTTP_FROXY这个设置，所以当你没使用他的时候，你的代理上网的设置依然还在，所以就存在了这样一个问题，至于怎样检测这个问题是否存在，你可以使用命令~~

~~env | grep -i proxy~~ ~~检测~~

~~命令显示：~~

~~http_proxy=~~~~http://localhost:42165~~

~~HTTP_PROXY=~~~~http://localhost:42165~~

~~或者显示其他，但是大致内容有http_proxy 和HTTP_PROXY这两项内容中的一项或者两项，~~

~~现在开始开始删除这两个环境变量~~

~~为了方便我们写一个bash 脚本~~

~~内容为：~~

~~#!bin/bash~~

~~unset http_proxy~~

~~unset HTTP_PROXY~~

~~写好之后保存并运行，好了现在我们来进一步的工作，~~

~~利用代码可以~~~~sudo gedit /etc/environment~~~~删除最后存在的包含http_proxy 和HTTP_PROXY的项，就可以了，其实这一步大可以不必，但是前提你要看一下你的Linux能不能正常使用apt-get update这个命令，不能再继续删除也可以。~~

~~讲了那么多其实只是一个很简单的去除代理的方法，，其实很简单，在这里了叫大家一个更简单的方法~~

~~Linux打开图形界面的网络设置。~~

## 3.root权限访问文件夹

```Bash
sudo nautilus

#更改root密码：
sudo passwd root

#进入root：
   su -    
#输入密码：666    
#退出root：
su user_name
exit
```

  

## 4.linux安装VMware

```Shell
##安装依赖
sudo apt update 
sudo apt install build-essential linux-headers-generic
##从官网下载软件包
##安装VMware
chmod +x VMware-Workstation-Full-17.5.1-23298084.x86_64.bundle 
sudo ./VMware-Workstation-Full-17.5.1-23298084.x86_64.bundle
```

![597](https://sdutvincirobot.feishu.cn/space/api/box/stream/download/asynccode/?code=NGRhMTA3NDEyYmU4YzgwNmIwYTQ0N2U2OWMyOGMwZTVfVWw4dDlscXUybzIyampNWHdGZzJWbFBzT3lXR1BlUWNfVG9rZW46WWc1NWI5YmZRb202UWp4ejJpTWN3QXpSbklkXzE3ODQ2NDc0NDU6MTc4NDY1MTA0NV9WNA&add_watermark=true&scene_type=CCM)

## 5.串口助手

![601](https://sdutvincirobot.feishu.cn/space/api/box/stream/download/asynccode/?code=YjJmODg0NTFiMzE5MWNhNjEzM2UwMDhhZTU1NDUwNDJfeWlWR2RGeDRPelk4RmJtRnA0SmdCS2llazRNNms1cXFfVG9rZW46VmNGNWI2Z2Jmb3VlS3N4UnZHWmNMZ3AwbjVnXzE3ODQ2NDc0NDU6MTc4NDY1MTA0NV9WNA&add_watermark=true&scene_type=CCM)

## 6.kubuntu24.04 LTS无法安装clash，缺少依赖的问题

使用以下网站解决问题：https://www.clashverge.dev/faq/linux.html

## 7.安装显卡驱动之后亮度调节问题

1.按照学长的方法更改xorg无效

2.安装 `xbacklight`：（有效）

```Bash
#安装
sudo apt install xbacklight
#设置调节亮度
xbacklight -set 50
```

## 8.kubuntu24.04 windows硬盘分区挂载失败问题：

```Bash
#查找有哪些分区
sudo fdisk -l
```

![](https://sdutvincirobot.feishu.cn/space/api/box/stream/download/asynccode/?code=NTQ1YmI1NjllOGQ0NzAyMDVkYmYwNTJiZDA5YjgyODVfanZFTXc3WldpcEdQNThhOGkwcGdNVGtXbjU0Z1hxQ3BfVG9rZW46THp1M2JtZjE5b3lWTHp4SVdWZGNDbHVWbmlkXzE3ODQ2NDc0NDU6MTc4NDY1MTA0NV9WNA&add_watermark=true&scene_type=CCM)

```Bash
#使用以下命令来修复文件系统，如果是 ntfs 文件系统，可以使用以下命令
sudo ntfsfix /dev/nvme0n1p4
#确保你安装了正确的文件系统支持工具。例如，如果文件系统是 ntfs，需要安装 ntfs-3g
sudo apt install ntfs-3g
#完成上述步骤后，尝试重新挂载分区
#分区一般挂载在media/xiaofangtongxue目录下，先创建挂载文件夹
sudo mkdir -p "/media/xiaofangtongxue/Text and Game"
#尝试挂载
sudo mount /dev/nvme0n1p4 "/media/xiaofangtongxue/Text and Game"
#检查是否挂载
df -h | grep "/media/xiaofangtongxue/Text and Game"
#取消挂载
sudo umount /media/xiaofangtongxue/WIN_C
```

![](https://sdutvincirobot.feishu.cn/space/api/box/stream/download/asynccode/?code=MGYxYmQ4M2ZkNmY2NDVkNzQ2ZDk3MzZmMzhkMmU3MTVfR1N6eTYybUtxTkxSdDBibmlsb1o5Y01uSHhpWXRwbHBfVG9rZW46SzBoRmJOcWx1b0dUaER4bUVWQWNSYnVobk9QXzE3ODQ2NDc0NDU6MTc4NDY1MTA0NV9WNA&add_watermark=true&scene_type=CCM)

挂载成功！！！

但是此时每次开机时磁盘需要重新挂载，解决方法如下：

要使分区在每次启动时自动挂载，可以通过编辑 `/etc/fstab` 文件来实现。请按以下步骤操作：

```Bash
#使用以下命令获取分区的 UUID：
sudo blkid /dev/nvme1n1p4


sudo vim /etc/fstab

#更改   UUID=xxxx-xxxx  /media/xiaofangtongxue/Text\040and\040Game  ntfs  defaults,rw  0  0
```

挂载成功后但是无法写入文件只可以读取，解决方法如下：

```Bash
#取消分区挂载
sudo umount /media/xiaofangtongxue/Text_and_Game
#出现错误，发现被占用
umount: /media/xiaofangtongxue/Text_and_Game: target is busy.
lsof +D /media/xiaofangtongxue/Text_and_Game    #列出正在运行的文件

COMMAND    PID            USER   FD   TYPE DEVICE SIZE/OFF  NODE NAME 
wpsclouds 3437 xiaofangtongxue  cwd    DIR  259,7     4096 90582 /media/xiaofangtongxue/Text_and_Game/AA_study
_resource/C++/24二纳作业/第一次考核

#使用keil杀死
kill -9 3437
lsof +D /media/xiaofangtongxue/Text_and_Game    #什么都不出现极为正确
#继续挂载
sudo mount -t ntfs-3g -o rw /dev/nvme0n1p4 /media/xiaofangtongxue/Text_and_Ga
me

#出现问题
The disk contains an unclean file system (0, 0). 
Metadata kept in Windows cache, refused to mount. 
Falling back to read-only mount because the NTFS partition is in an 
unsafe state. Please resume and shutdown Windows fully (no hibernation 
or fast restarting.) 
Could not mount read-write, trying read-only

sudo ntfsfix /dev/nvme0n1p4    #进行修复
NTFS partition /dev/nvme0n1p4 was processed successfully.     #完成

sudo mount -t ntfs-3g -o rw /dev/nvme0n1p4 /media/xiaofangtongxue/Text_and_Ga
me                                  #重新挂载，实现读写功能
mount | grep nvme0n1p4              #检查挂载
/dev/nvme0n1p4 on /media/xiaofangtongxue/Text_and_Game type fuseblk (rw,relatime,user_id=0,group_id=0,allow_ot
her,blksize=4096)                   #正确使用
```

## 9.QQ音乐在kubuntu24.04闪退问题

```Bash
sudo vi /usr/share/applications/qqmusic.desktop
#找到Exec=/opt/qqmusic/qqmusic %U
#在后面加上--no-sandbox
```

![](https://sdutvincirobot.feishu.cn/space/api/box/stream/download/asynccode/?code=NmI4OTVmZDIyMjJjOTE4NTE1OGE3ZDViNjc1MDRkNGVfb3JWM01wRkRKVm1rZTFZT3dKRmhuRmZmbHRoTDBiUjlfVG9rZW46Q0xZUmJxQlpXb0tvNW94bXJRSWNRcFkybmNnXzE3ODQ2NDc0NDU6MTc4NDY1MTA0NV9WNA&add_watermark=true&scene_type=CCM)

![](https://sdutvincirobot.feishu.cn/space/api/box/stream/download/asynccode/?code=NGI4NjVjZTZhN2I4NGIzY2RlMjFiYTQ2NTM1ZGFlYTJfTEl6UllIb3VJYkhJZ1JzcmUyQlVNZ3drQ3lzMjNQNHBfVG9rZW46R29WbmJwc1Nib0ZTQXV4c0xsQmNKRGp3bjZmXzE3ODQ2NDc0NDU6MTc4NDY1MTA0NV9WNA&add_watermark=true&scene_type=CCM)

成功解决！

## **10. 权限不足导致无法访问**

#### **原因：**

挂载点或磁盘上的文件权限不足，导致普通用户无法进入。

#### **解决方法：修改挂载点权限**

**方法一：将挂载点所有权改为当前用户**

bash

复制代码

`sudo chown -R $USER:$USER /mnt/your_mount_point`

  

# Fedora 系列

## 1.Fedora Update 
[Fedora 升级系统版本](https://www.sysgeek.cn/upgrade-fedora-to-latest-release/)

## 2. linux 下的bilibili客户端
[bilibili](https://github.com/msojocs/bilibili-linux)

##  3. 很多软件安装之后不显示中文字体,多半是没有安装
    

![378](https://sdutvincirobot.feishu.cn/space/api/box/stream/download/asynccode/?code=OWE4NDUyNjVlZmRkOGZlNTlmNTE5MDk3NmMyOGQ4ZGVfMWRwUmI2dFM2SXRoM2IzWmFNZVRSN1Y3bDhtYUxUQzFfVG9rZW46V2MyRmI1N0Vwb2FIZm94akNxRGNJQVczbmxyXzE3ODQ2NDc0NDU6MTc4NDY1MTA0NV9WNA&add_watermark=true&scene_type=CCM)

  

```Bash
#安装中文字体
sudo dnf install google-noto-sans-cjk-ttc-fonts google-noto-serif-cjk-ttc-fonts \
adobe-source-han-sans-cn-fonts adobe-source-han-serif-cn-fonts \
wqy-zenhei-fonts wqy-microhei-fonts
#刷新字体
fc-cache -fv
#确认系统字体能找到中文覆盖
fc-list :lang=zh | wc -l
#返回的数字大于0说明成功
```

![422](https://sdutvincirobot.feishu.cn/space/api/box/stream/download/asynccode/?code=YTk4ZmNmOTdiOWQ3NWJlYmI1NGNlMmUxMTYyMmEyODlfT0lFdVZsbTk2Q2owT01STnVUY0xTTXhVSDc5eWtTeHhfVG9rZW46R1kxNmJnYnp1b2V1T0R4ZkFxTmNzYUhBbmpkXzE3ODQ2NDc0NDU6MTc4NDY1MTA0NV9WNA&add_watermark=true&scene_type=CCM)

成功解决!

## 4.  vscode配置 Symbols Nerd Font Mono字体
    

![769](https://sdutvincirobot.feishu.cn/space/api/box/stream/download/asynccode/?code=MDEzMDkzNDk0N2RlYzIwMmIwYTM2MDFiNzk2MmM3MzNfajNxU3dFSkZkZnhkZm8wTjNVdkRiN3p6VFo5U0Y1bE1fVG9rZW46T3lHNWJVVDk5bzg2T1J4RWxzYmNONXR2bjBmXzE3ODQ2NDc0NDU6MTc4NDY1MTA0NV9WNA&add_watermark=true&scene_type=CCM)

# 适用于所有linux系列

##  1. 更改文件所有者

```Bash
ls -l  #查看文件所有者
total 36 
drwxr-xr-x. 4 xiaofang xiaofang 4096 Oct 24 16:26 base_driver_pkg 
drwxr-xr-x. 3 xiaofang xiaofang 4096 Oct 24 16:26 base_interfaces 
drwxr-xr-x. 4 xiaofang xiaofang 4096 Oct 24 16:26 localization_pkg 
drwxr-xr-x. 3 xiaofang xiaofang 4096 Oct 24 16:26 my_map_server 
drwxr-xr-x. 4 xiaofang xiaofang 4096 Oct 24 16:26 my_slam_toolbox 
drwxrwxrwx. 4 root     root     4096 Oct 25 19:26 navigation2_config 

sudo chown $USER:$USER navigation2_config/  #更改为当前用户所有
sudo chown -R $USER:$USER folder_name #递归修改
ls -l 
total 36 
drwxr-xr-x. 4 xiaofang xiaofang 4096 Oct 24 16:26 base_driver_pkg 
drwxr-xr-x. 3 xiaofang xiaofang 4096 Oct 24 16:26 base_interfaces 
drwxr-xr-x. 4 xiaofang xiaofang 4096 Oct 24 16:26 localization_pkg 
drwxr-xr-x. 3 xiaofang xiaofang 4096 Oct 24 16:26 my_map_server 
drwxr-xr-x. 4 xiaofang xiaofang 4096 Oct 24 16:26 my_slam_toolbox 
drwxrwxrwx. 4 xiaofang xiaofang 4096 Oct 25 19:26 navigation2_config
 
```

##  2. 创建软件图标

```Bash
cd ~/.local/share/applications/
touch ./qqmusic.desktop
vim ./qqmusic.desktop
sudo chmod +x ./qqmusic.desktop
```

```Bash
[Desktop Entry]
Name=QQ音乐
Exec=/home/tungchiahui/UserFloder/Applications/qqmusic/qqmusic-1.1.7.AppImage
Icon=/home/tungchiahui/UserFloder/Applications/qqmusic/QQ_Music2023.svg
Type=Application
Categories=Audio;Music;Player;
Comment=QQ Music Client for Linux
```

```Bash
Utility（实用工具）
Development（开发工具）
Graphics（图形设计）
AudioVideo（影音）
Education（教育）
Network（网络）
Office（办公）
```

# Linux美化与体验优化

##  1. 终端美化
###  1.1美化提示符 （使用starship）
1. 下载好字体还有配置文件
[starship](https://starship.rs/)

按照官方配置即可

![569](https://sdutvincirobot.feishu.cn/space/api/box/stream/download/asynccode/?code=NmVkMGI5ZGJhNmIzZTc1NjU1OGEzZDQyYWZlNTczOTRfd01rM0tVQWtORUNoSmIydHV1Um5yN1pFeUNNeHVFeWFfVG9rZW46T3plUWIyS3RHb1JFdUV4VWYzb2NwVnJibmpmXzE3ODQ2NDc0NDU6MTc4NDY1MTA0NV9WNA&add_watermark=true&scene_type=CCM)

2. 编辑当前shell的配置文件
例如:

fish
```Shell
vim ~/.config/fish/config.fish

#写入
starship init fish | source
```

bash
```Bash
vim ~/.bashrc 

eval "$(starship init bash)"
```

##  2.终端文件显示
[使用yazi](https://yazi-rs.github.io/docs/quick-start)

## 3.Wayland 窗口管理器美化 NiRi DMS
### OBS在niri下无法录制屏幕的问题
- 原因：原来在KDE下面，转到niri之后缺少驱动 `xdg-desktop-portal-gnome`
- 解决方法:重新安装这个驱动
```bash
#install service
sudo dnf install xdg-desktop-portal-gnome
#reboot service
systemctl --user restart xdg-desktop-portal
systemctl --user restart xdg-desktop-portal-gnome
#查看状态  显示active即可
systemctl --user status xdg-desktop-portal-gnome
#彻底关闭OBS
flatpak kill com.obsproject.Studio
#重新打开就有啦
```
