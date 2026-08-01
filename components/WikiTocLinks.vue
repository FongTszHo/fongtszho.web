<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type TocLink = {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

const props = defineProps<{
  links: TocLink[]
}>()

const activeId = ref<string>()
let frameId: number | undefined

const tocLinks = computed(() => {
  const result: TocLink[] = []

  function collect(links: TocLink[]) {
    for (const link of links) {
      if (link.depth === 2 || link.depth === 3) result.push(link)
      if (link.children?.length) collect(link.children)
    }
  }

  collect(props.links)
  return result
})

function updateActiveLink() {
  frameId = undefined
  const visibleLink = tocLinks.value.reduce<string | undefined>((current, link) => {
    const heading = document.getElementById(link.id)
    return heading && heading.getBoundingClientRect().top <= 150 ? link.id : current
  }, tocLinks.value[0]?.id)

  activeId.value = visibleLink
}

function scheduleActiveLinkUpdate() {
  if (frameId !== undefined) return
  frameId = window.requestAnimationFrame(updateActiveLink)
}

onMounted(() => {
  updateActiveLink()
  window.addEventListener('scroll', scheduleActiveLinkUpdate, { passive: true })
  window.addEventListener('resize', scheduleActiveLinkUpdate)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scheduleActiveLinkUpdate)
  window.removeEventListener('resize', scheduleActiveLinkUpdate)
  if (frameId !== undefined) window.cancelAnimationFrame(frameId)
})
</script>

<template>
  <ul class="wiki-toc-list">
    <li v-for="link in tocLinks" :key="link.id" :class="{ 'is-child': link.depth === 3 }">
      <a :href="`#${link.id}`" :class="{ active: activeId === link.id }">
        {{ link.text }}
      </a>
    </li>
  </ul>
</template>
