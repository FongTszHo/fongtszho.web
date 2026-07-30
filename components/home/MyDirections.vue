<script setup lang="ts">
const directions = [
  {
    name: '机器人',
    detail: '围绕 ROS2、导航、仿真和机器人系统，把实践中的判断记录下来。',
    tag: '机器人方向'
  },
  {
    name: '嵌入式',
    detail: '整理 STM32、ESP32、电机控制、外设调试和硬件相关笔记。',
    tag: '嵌入式方向'
  },
  {
    name: 'Linux',
    detail: '记录系统配置、终端工作流、环境搭建和长期踩坑经验。',
    tag: 'Linux 系统'
  }
]
</script>

<template>
  <section class="home-section directions-section">
    <HomeSectionHeader
      label="我的方向"
      title="慢慢靠近的技术海岸"
      description="这里不是简历式罗列，而是几个会长期投入、不断加深的方向。"
    />

    <div class="direction-grid">
      <article v-for="direction in directions" :key="direction.name" class="direction-card">
        <span>{{ direction.tag }}</span>
        <h3>{{ direction.name }}</h3>
        <p>{{ direction.detail }}</p>
      </article>
    </div>
  </section>
</template>
