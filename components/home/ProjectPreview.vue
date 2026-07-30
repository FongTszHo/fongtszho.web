<script setup lang="ts">
const projects = [
  {
    name: 'ROS2 机器人导航',
    detail: '整理建图、定位、Nav2 配置与实际调试中遇到的问题。'
  },
  {
    name: 'FOC 电机控制',
    detail: '继续验证 ADC 采样、SVPWM、电流环与电机调参。'
  },
  {
    name: 'AI 工具链',
    detail: '尝试把 AI 编程工具接入日常开发与知识整理流程。'
  }
]
</script>

<template>
  <section class="home-section project-preview-section">
    <div class="section-header inline-header">
      <div>
        <p class="section-label">当前方向</p>
        <h2>正在进行</h2>
      </div>
      <NuxtLink class="text-link" to="/projects">查看记录</NuxtLink>
    </div>

    <div class="project-preview-list">
      <article v-for="project in projects" :key="project.name" class="project-preview-item">
        <h3>{{ project.name }}</h3>
        <p>{{ project.detail }}</p>
      </article>
    </div>
  </section>
</template>
