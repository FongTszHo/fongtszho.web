<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const progress = ref(0)
let frameId: number | undefined

function updateProgress() {
  frameId = undefined
  const root = document.documentElement
  const scrollableHeight = root.scrollHeight - root.clientHeight
  progress.value = scrollableHeight > 0 ? Math.min(100, (window.scrollY / scrollableHeight) * 100) : 0
}

function scheduleProgressUpdate() {
  if (frameId !== undefined) return
  frameId = window.requestAnimationFrame(updateProgress)
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', scheduleProgressUpdate, { passive: true })
  window.addEventListener('resize', scheduleProgressUpdate)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scheduleProgressUpdate)
  window.removeEventListener('resize', scheduleProgressUpdate)
  if (frameId !== undefined) window.cancelAnimationFrame(frameId)
})
</script>

<template>
  <div
    class="reading-progress"
    role="progressbar"
    aria-label="阅读进度"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="Math.round(progress)"
  >
    <span :style="{ width: `${progress}%` }" />
  </div>
</template>
