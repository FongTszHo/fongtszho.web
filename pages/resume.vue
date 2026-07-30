<script setup lang="ts">
const { data: resume } = await useAsyncData('resume-page', () =>
  queryCollection('content').path('/resume').first()
)
</script>

<template>
  <article class="prose-page">
    <ContentRenderer v-if="resume" :value="resume" />
  </article>
</template>
