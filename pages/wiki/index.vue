<script setup lang="ts">
const route = useRoute()
const selectedCategory = computed(() => route.query.category?.toString())

const { data: allNotes } = await useAsyncData('wiki-notes', () =>
  queryCollection('content')
    .where('type', '=', 'wiki')
    .where('draft', '=', false)
    .order('category', 'ASC')
    .all()
)

const categories = computed(() => {
  const values = new Set((allNotes.value || []).map((note) => note.category).filter(Boolean))
  return Array.from(values)
})

const filteredNotes = computed(() => {
  if (!selectedCategory.value) return allNotes.value || []
  return (allNotes.value || []).filter((note) => note.category === selectedCategory.value)
})
</script>

<template>
  <section class="page-intro">
    <p class="eyebrow">Wiki</p>
    <h1>知识地图</h1>
    <p>从 Obsidian 中沉淀出来的长期笔记，按照技术领域逐步整理。</p>
  </section>

  <section class="content-section">
    <div class="filter-row">
      <NuxtLink class="chip" :class="{ active: !selectedCategory }" to="/wiki">全部</NuxtLink>
      <NuxtLink
        v-for="category in categories"
        :key="category"
        class="chip"
        :class="{ active: selectedCategory === category }"
        :to="`/wiki?category=${encodeURIComponent(category || '')}`"
      >
        {{ category }}
      </NuxtLink>
    </div>

    <div class="article-grid">
      <NuxtLink v-for="note in filteredNotes" :key="note.id" class="article-card" :to="note.path">
        <span class="note-meta">{{ note.category }}</span>
        <h2>{{ note.title }}</h2>
        <p>{{ note.description }}</p>
      </NuxtLink>
    </div>
  </section>
</template>
