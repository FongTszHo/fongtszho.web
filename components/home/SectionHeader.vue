<script setup lang="ts">
defineProps<{
  label: string
  title: string
  description?: string
}>()
</script>

<template>
  <div class="section-header">
    <p class="section-label">{{ label }}</p>
    <h2>{{ title }}</h2>
    <p v-if="description">{{ description }}</p>
  </div>
</template>
