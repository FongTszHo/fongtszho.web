<script setup lang="ts">
const blog = {
  name: 'Blog',
  detail: '用于记录学习过程、阶段总结和一些需要完整写下来的想法。',
  to: '/blog'
}
</script>

<template>
  <section class="home-section compact-section">
    <HomeSectionHeader
      label="本站"
      title="关于本站"
    />

    <div class="entry-grid">
      <article class="entry-card primary about-site-card">
        <h3>这是我的个人知识空间。</h3>
        <p>记录机器人、嵌入式、Linux 以及软件开发过程中的学习记录。</p>
        <NuxtLink class="button button-primary" to="/wiki">进入 Wiki</NuxtLink>
      </article>

      <NuxtLink class="entry-card blog-entry-card" :to="blog.to">
        <h3>{{ blog.name }}</h3>
        <p>{{ blog.detail }}</p>
      </NuxtLink>
    </div>
  </section>
</template>
