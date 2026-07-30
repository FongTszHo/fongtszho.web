<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(`content-${route.path}`, () =>
  queryCollection('content').path(route.path).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

const typeLabels: Record<string, string> = {
  blog: '博客',
  wiki: 'Wiki',
  project: '项目',
  page: '页面'
}

const isWikiArticle = computed(() => page.value?.type === 'wiki')

const { data: wikiNotes } = await useAsyncData('wiki-article-navigation', () =>
  queryCollection('content')
    .where('type', '=', 'wiki')
    .where('draft', '=', false)
    .order('category', 'ASC')
    .order('title', 'ASC')
    .all()
)

useSeoMeta({
  title: page.value?.title ? `${page.value.title} - Dev Atlas` : 'Dev Atlas',
  description: page.value?.description
})
</script>

<template>
  <div :class="isWikiArticle ? 'wiki-article-layout' : undefined">
    <WikiArticleSidebar
      v-if="isWikiArticle"
      :links="page?.body?.toc?.links"
      :notes="wikiNotes || []"
      :current-path="route.path"
    />

    <article class="prose-page">
      <div class="article-kicker">
        <NuxtLink :to="page?.type === 'blog' ? '/blog' : page?.type === 'project' ? '/projects' : '/wiki'">
          {{ typeLabels[page?.type || 'page'] }}
        </NuxtLink>
        <span v-if="page?.date">{{ page.date }}</span>
      </div>
      <ContentRenderer v-if="page" :value="page" />
    </article>
  </div>
</template>
