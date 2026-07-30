<script setup lang="ts">
const items = [
  {
    name: '机器人项目',
    status: '系统实践',
    detail: '整理机器人项目中的结构、控制、调试和复盘。'
  },
  {
    name: 'FOC 电机控制器',
    status: '嵌入式',
    detail: '记录电机控制、驱动调试和硬件系统中的问题。'
  },
  {
    name: 'AI 工具链',
    status: '工作流',
    detail: '探索 AI 编程助手、Agent 使用方式和个人知识流。'
  }
]
</script>

<template>
  <section class="home-section currently-section">
    <HomeSectionHeader
      label="正在进行"
      title="正在构建"
      description="这些内容还在进行中，先记录过程，再慢慢整理成完整文章。"
    />

    <div class="building-list">
      <article v-for="item in items" :key="item.name" class="building-item">
        <span>{{ item.status }}</span>
        <h3>{{ item.name }}</h3>
        <p>{{ item.detail }}</p>
      </article>
    </div>
  </section>
</template>
