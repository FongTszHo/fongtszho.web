<script setup lang="ts">
type TocLink = {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

defineProps<{
  links: TocLink[]
}>()
</script>

<template>
  <ul>
    <li v-for="link in links" :key="link.id">
      <a :href="`#${link.id}`">{{ link.text }}</a>
      <WikiTocLinks v-if="link.children?.length" :links="link.children" />
    </li>
  </ul>
</template>
