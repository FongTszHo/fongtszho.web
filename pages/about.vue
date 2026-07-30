<script setup lang="ts">
const { data: about } = await useAsyncData('about-page', () =>
  queryCollection('content').path('/about').first()
)
</script>

<template>
  <article class="prose-page">
    <ContentRenderer v-if="about" :value="about" />
  </article>
</template>
