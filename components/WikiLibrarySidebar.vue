<script setup lang="ts">
type WikiNote = {
  id: string
  path: string
  title: string
  category?: string
}

const props = defineProps<{
  notes: WikiNote[]
  currentPath: string
}>()

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
  <aside class="wiki-library-sidebar" aria-label="全部 Wiki 文章">
    <p class="wiki-sidebar-title">全部 Wiki</p>
    <nav class="wiki-library" aria-label="全部 Wiki 文章">
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
