<script setup lang="ts">
type TocLink = {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

type WikiNote = {
  id: string
  path: string
  title: string
  category?: string
}

const props = defineProps<{
  links?: TocLink[]
  notes: WikiNote[]
  currentPath: string
}>()

const activeView = ref<'toc' | 'wiki'>('toc')

const groupedNotes = computed(() => {
  const groups = new Map<string, WikiNote[]>()

  for (const note of props.notes) {
    const category = note.category || 'Notes'
    const categoryNotes = groups.get(category) || []
    categoryNotes.push(note)
    groups.set(category, categoryNotes)
  }

  return Array.from(groups, ([category, notes]) => ({ category, notes }))
})
</script>

<template>
  <aside class="wiki-article-sidebar" aria-label="Wiki 文章导航">
    <div class="wiki-sidebar-tabs" role="tablist" aria-label="目录显示方式">
      <button
        type="button"
        role="tab"
        :aria-selected="activeView === 'toc'"
        :class="{ active: activeView === 'toc' }"
        @click="activeView = 'toc'"
      >
        本文目录
      </button>
      <button
        type="button"
        role="tab"
        :aria-selected="activeView === 'wiki'"
        :class="{ active: activeView === 'wiki' }"
        @click="activeView = 'wiki'"
      >
        全部 Wiki
      </button>
    </div>

    <nav v-if="activeView === 'toc'" class="wiki-toc" aria-label="本文目录">
      <WikiTocLinks v-if="links?.length" :links="links" />
      <p v-else class="wiki-sidebar-empty">这篇笔记暂时没有小标题。</p>
    </nav>

    <nav v-else class="wiki-library" aria-label="全部 Wiki 文章">
      <section v-for="group in groupedNotes" :key="group.category" class="wiki-library-group">
        <h2>{{ group.category }}</h2>
        <NuxtLink
          v-for="note in group.notes"
          :key="note.id"
          :to="note.path"
          :class="{ active: note.path === currentPath }"
          :aria-current="note.path === currentPath ? 'page' : undefined"
        >
          {{ note.title }}
        </NuxtLink>
      </section>
    </nav>
  </aside>
</template>
