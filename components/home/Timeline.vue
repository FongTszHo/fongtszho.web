<script setup lang="ts">
const moments = [
  { year: '2024', title: 'Robocon', detail: '机器人竞赛与硬件系统实践。' },
  { year: '2025', title: '嵌入式 / ROS2', detail: '嵌入式能力与机器人软件栈持续积累。' },
  { year: '2026', title: '机器人 / AI', detail: '机器人系统、仿真与 AI 工具链结合探索。' }
]
</script>

<template>
  <section class="home-section timeline-section">
    <HomeSectionHeader
      label="时间线"
      title="缓慢生长的记录"
      description="把阶段性的学习轨迹保留下来，方便未来回看。"
    />

    <div class="timeline">
      <article v-for="moment in moments" :key="moment.year" class="timeline-item">
        <time>{{ moment.year }}</time>
        <div>
          <h3>{{ moment.title }}</h3>
          <p>{{ moment.detail }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
