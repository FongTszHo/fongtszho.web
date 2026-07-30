<script setup lang="ts">
const props = withDefaults(defineProps<{
  sentence?: string
  separator?: string
  blurAmount?: number
  animationDuration?: number
  pauseBetweenAnimations?: number
}>(), {
  sentence: 'True Focus',
  separator: ' ',
  blurAmount: 2.2,
  animationDuration: 0.55,
  pauseBetweenAnimations: 1.25
})

const words = computed(() => props.sentence.split(props.separator))
const currentIndex = ref(0)
const container = ref<HTMLElement | null>(null)
const wordRefs = ref<HTMLElement[]>([])
const focusRect = ref({ x: 0, y: 0, width: 0, height: 0 })

let interval: ReturnType<typeof setInterval> | undefined
let resizeObserver: ResizeObserver | undefined

const setWordRef = (element: unknown, index: number) => {
  if (element instanceof HTMLElement) wordRefs.value[index] = element
}

const updateFocusRect = () => {
  const host = container.value
  const activeWord = wordRefs.value[currentIndex.value]
  if (!host || !activeWord) return

  const parentRect = host.getBoundingClientRect()
  const activeRect = activeWord.getBoundingClientRect()
  focusRect.value = {
    x: activeRect.left - parentRect.left,
    y: activeRect.top - parentRect.top,
    width: activeRect.width,
    height: activeRect.height
  }
}

const frameStyle = computed(() => ({
  width: `${focusRect.value.width}px`,
  height: `${focusRect.value.height}px`,
  transform: `translate3d(${focusRect.value.x}px, ${focusRect.value.y}px, 0)`,
  transitionDuration: `${props.animationDuration}s`
}))

watch(currentIndex, () => nextTick(updateFocusRect))

onMounted(async () => {
  await nextTick()
  updateFocusRect()

  resizeObserver = new ResizeObserver(updateFocusRect)
  if (container.value) resizeObserver.observe(container.value)

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduceMotion && words.value.length > 1) {
    interval = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % words.value.length
    }, (props.animationDuration + props.pauseBetweenAnimations) * 1000)
  }
})

onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
  resizeObserver?.disconnect()
})
</script>

<template>
  <span ref="container" class="true-focus" :aria-label="sentence">
    <span
      v-for="(word, index) in words"
      :key="`${word}-${index}`"
      :ref="element => setWordRef(element, index)"
      class="true-focus-word"
      :class="{ active: index === currentIndex }"
      :style="{
        filter: index === currentIndex ? 'blur(0)' : `blur(${blurAmount}px)`,
        transitionDuration: `${animationDuration}s`
      }"
      aria-hidden="true"
    >{{ word }}</span>

    <span class="true-focus-frame" :style="frameStyle" aria-hidden="true">
      <span class="focus-corner top-left" />
      <span class="focus-corner top-right" />
      <span class="focus-corner bottom-left" />
      <span class="focus-corner bottom-right" />
    </span>
  </span>
</template>
