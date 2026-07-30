<script setup lang="ts">
const theme = ref<'light' | 'dark'>('light')

const applyTheme = (value: 'light' | 'dark') => {
  theme.value = value
  document.documentElement.dataset.theme = value
  localStorage.setItem('harbor-theme', value)
}

onMounted(() => {
  const saved = localStorage.getItem('harbor-theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(saved === 'dark' || (!saved && prefersDark) ? 'dark' : 'light')
})

const toggleTheme = () => {
  applyTheme(theme.value === 'dark' ? 'light' : 'dark')
}
</script>

<template>
  <button class="theme-toggle icon-only" type="button" :aria-label="theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'" @click="toggleTheme">
    <span aria-hidden="true">{{ theme === 'dark' ? '☾' : '☼' }}</span>
  </button>
</template>
