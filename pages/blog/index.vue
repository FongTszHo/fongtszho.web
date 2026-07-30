<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-posts', () =>
  queryCollection('content')
    .where('type', '=', 'blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all()
)
</script>

<template>
  <section class="page-intro">
    <p class="eyebrow">博客</p>
    <h1>开发日志</h1>
    <p>把阶段性的学习、折腾、复盘和想法整理成可以回看的文章。</p>
  </section>

  <section class="content-section">
    <div class="article-grid">
      <NuxtLink v-for="post in posts" :key="post.id" class="article-card" :to="post.path">
        <span class="note-meta">{{ post.date }}</span>
        <h2>{{ post.title }}</h2>
        <p>{{ post.description }}</p>
      </NuxtLink>
    </div>
  </section>
</template>
