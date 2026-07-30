<script setup lang="ts">
const props = defineProps<{
  notes: Array<{
    id: string
    path: string
    title: string
    description?: string
    category?: string
    date?: string
  }>
}>()

const noteSummary = (note: { description?: string; tags?: string[] }) => {
  if (note.description) return note.description
  return '整理：项目过程、配置记录和踩坑答案'
}

const wikiNotes = computed(() => props.notes.filter(note => note.path.startsWith('/wiki/')).slice(0, 3))
const blogNotes = computed(() => props.notes.filter(note => note.path.startsWith('/blog/')).slice(0, 3))
</script>

<template>
  <section class="home-section activity-section">
    <div class="section-header inline-header">
      <div>
        <p class="section-label">动态</p>
        <h2>最近更新</h2>
      </div>
    </div>

    <div class="activity-columns">
      <div class="activity-group">
        <div class="activity-group-head">
          <h3>Wiki</h3>
          <NuxtLink class="text-link" to="/wiki">查看全部</NuxtLink>
        </div>
        <div class="activity-list">
          <NuxtLink v-for="note in wikiNotes" :key="note.id" class="note-item" :to="note.path">
            <span class="activity-dot" aria-hidden="true" />
            <div class="activity-copy">
              <div class="activity-head">
                <h3>{{ note.title }}</h3>
                <span>{{ note.category || '笔记' }}</span>
              </div>
              <p>{{ noteSummary(note) }}</p>
            </div>
          </NuxtLink>
          <p v-if="!wikiNotes.length" class="activity-empty">暂无更新</p>
        </div>
      </div>

      <div class="activity-group">
        <div class="activity-group-head">
          <h3>Blog</h3>
          <NuxtLink class="text-link" to="/blog">查看全部</NuxtLink>
        </div>
        <div class="activity-list">
          <NuxtLink v-for="note in blogNotes" :key="note.id" class="note-item" :to="note.path">
            <span class="activity-dot coast" aria-hidden="true" />
            <div class="activity-copy">
              <div class="activity-head">
                <h3>{{ note.title }}</h3>
                <span>{{ note.category || '随笔' }}</span>
              </div>
              <p>{{ noteSummary(note) }}</p>
            </div>
          </NuxtLink>
          <p v-if="!blogNotes.length" class="activity-empty">暂无更新</p>
        </div>
      </div>
    </div>
  </section>
</template>
