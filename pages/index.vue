<script setup lang="ts">
const { data: notes } = await useAsyncData('home-notes', () =>
  queryCollection('content')
    .where('draft', '=', false)
    .where('type', '<>', 'page')
    .order('date', 'DESC')
    .limit(12)
    .all()
)
</script>

<template>
  <HomeHero />
  <div class="home-content-surface">
    <HomeRecentNotes :notes="notes || []" />
    <HomeKnowledgeEntries />
    <HomeProjectPreview />
  </div>
</template>
