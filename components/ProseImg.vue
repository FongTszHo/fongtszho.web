<script setup lang="ts">
const props = defineProps<{
  src?: string
  alt?: string
  title?: string
}>()

const isPreviewOpen = ref(false)

function closePreview() {
  isPreviewOpen.value = false
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closePreview()
}

watch(isPreviewOpen, (isOpen) => {
  document.body.classList.toggle('image-preview-open', isOpen)
})

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.classList.remove('image-preview-open')
})
</script>

<template>
  <figure class="prose-image">
    <button
      class="prose-image-trigger"
      type="button"
      :aria-label="`放大查看图片${props.alt ? `：${props.alt}` : ''}`"
      @click="isPreviewOpen = true"
    >
      <img :src="props.src" :alt="props.alt || ''" :title="props.title" loading="lazy">
    </button>
    <figcaption v-if="props.alt" class="prose-image-caption">{{ props.alt }}</figcaption>
  </figure>

  <Teleport to="body">
    <div
      v-if="isPreviewOpen"
      class="image-preview"
      role="dialog"
      aria-modal="true"
      :aria-label="props.alt || '图片预览'"
      @click.self="closePreview"
    >
      <button class="image-preview-close" type="button" aria-label="关闭图片预览" @click="closePreview">
        <span aria-hidden="true">×</span>
      </button>
      <img :src="props.src" :alt="props.alt || ''">
    </div>
  </Teleport>
</template>
