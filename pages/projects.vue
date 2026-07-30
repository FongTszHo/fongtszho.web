<script setup lang="ts">
const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('content')
    .where('type', '=', 'project')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all()
)
</script>

<template>
  <section class="page-intro">
    <p class="eyebrow">项目</p>
    <h1>项目实践</h1>
    <p>把可以展示能力的实践经历沉淀成项目页，方便复盘，也方便对外展示。</p>
  </section>

  <section class="content-section">
    <div class="article-grid">
      <NuxtLink v-for="project in projects" :key="project.id" class="article-card feature-card" :to="project.path">
        <span class="note-meta">{{ project.category }}</span>
        <h2>{{ project.title }}</h2>
        <p>{{ project.description }}</p>
      </NuxtLink>
    </div>
  </section>
</template>
