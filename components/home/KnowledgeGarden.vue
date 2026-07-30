<script setup lang="ts">
const categories = [
  {
    name: '机器人',
    detail: 'ROS2、导航、仿真与机器人系统相关记录。',
    to: '/wiki?category=Robotics'
  },
  {
    name: '嵌入式',
    detail: 'STM32、ESP32、电机控制与硬件调试笔记。',
    to: '/wiki?category=Embedded'
  },
  {
    name: 'Linux',
    detail: 'Fedora、终端工作流、系统配置和问题整理。',
    to: '/wiki?category=Linux'
  },
  {
    name: 'AI 工具',
    detail: '编程助手、Agent 工具链和个人工作流。',
    to: '/wiki?category=AI Agent'
  }
]
</script>

<template>
  <section class="home-section">
    <HomeSectionHeader
      label="知识花园"
      title="持续修剪的知识地图"
      description="不是完整的答案库，而是一片持续修剪的知识花园。"
    />

    <div class="garden-grid">
      <NuxtLink v-for="category in categories" :key="category.name" class="garden-card" :to="category.to">
        <span>{{ category.name }}</span>
        <p>{{ category.detail }}</p>
      </NuxtLink>
    </div>
  </section>
</template>
