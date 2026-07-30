<script setup lang="ts">
const projects = [
  {
    name: 'Robocon 机器人',
    detail: '机器人竞赛中的结构集成、控制实践和系统调试。'
  },
  {
    name: 'ROS2 自主机器人',
    detail: '围绕导航、感知和机器人系统集成展开的实验。'
  },
  {
    name: 'FOC 电机控制器',
    detail: '关于电机、驱动、控制参数和嵌入式调试的记录。'
  },
  {
    name: 'MuJoCo 仿真',
    detail: '用于机器人学习的物理仿真和实验记录。'
  }
]
</script>

<template>
  <section class="home-section projects-section">
    <HomeSectionHeader
      label="项目"
      title="项目开发过程"
      description="项目页会记录目标、过程、问题和迭代，而不只是最终成果。"
    />

    <div class="project-list">
      <article v-for="project in projects" :key="project.name" class="project-row">
        <h3>{{ project.name }}</h3>
        <p>{{ project.detail }}</p>
      </article>
    </div>
  </section>
</template>
