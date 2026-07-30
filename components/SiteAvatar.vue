<script setup lang="ts">
const { app } = useRuntimeConfig()
const avatarSrc = `${app.baseURL}_.jpeg`
const fallbackSrc = `${app.baseURL}avatar-placeholder.svg`

const handleImageError = (event: Event) => {
  const image = event.currentTarget as HTMLImageElement
  if (!image.src.endsWith('avatar-placeholder.svg')) image.src = fallbackSrc
}
</script>

<template>
  <img
    class="site-avatar"
    :src="avatarSrc"
    alt="FongTszHo 的头像"
    width="42"
    height="42"
    decoding="async"
    @error="handleImageError"
  >
</template>
