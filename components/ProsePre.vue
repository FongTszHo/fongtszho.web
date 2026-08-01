<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false
})

const attrs = useAttrs()
const codeElement = ref<HTMLElement | null>(null)
const copied = ref(false)
let resetCopiedTimer: ReturnType<typeof setTimeout> | undefined

const language = computed(() => {
  const classes = Array.isArray(attrs.class) ? attrs.class.join(' ') : String(attrs.class || '')
  const matchedLanguage = classes.match(/(?:^|\s)language-([^\s]+)/)?.[1]?.toLowerCase()

  if (!matchedLanguage) return 'text'

  const labels: Record<string, string> = {
    bash: 'bash',
    sh: 'shell',
    shell: 'shell',
    zsh: 'zsh',
    js: 'javascript',
    javascript: 'javascript',
    ts: 'typescript',
    typescript: 'typescript',
    vue: 'vue',
    html: 'html',
    css: 'css',
    json: 'json',
    yaml: 'yaml',
    yml: 'yaml',
    python: 'python',
    py: 'python',
    cpp: 'c++',
    c: 'c',
    rust: 'rust',
    go: 'go',
    markdown: 'markdown',
    md: 'markdown'
  }

  return labels[matchedLanguage] || matchedLanguage
})

async function copyCode() {
  const text = codeElement.value?.innerText
  if (!text) return

  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
  }

  copied.value = true
  if (resetCopiedTimer) clearTimeout(resetCopiedTimer)
  resetCopiedTimer = setTimeout(() => {
    copied.value = false
  }, 1600)
}

onBeforeUnmount(() => {
  if (resetCopiedTimer) clearTimeout(resetCopiedTimer)
})
</script>

<template>
  <div class="code-block">
    <div class="code-block-header">
      <span class="code-language">{{ language }}</span>
      <button
        class="code-copy-button"
        type="button"
        :aria-label="copied ? '代码已复制' : '复制代码'"
        :title="copied ? '代码已复制' : '复制代码'"
        @click="copyCode"
      >
        {{ copied ? '已复制' : '复制' }}
      </button>
    </div>
    <pre ref="codeElement" v-bind="attrs"><slot /></pre>
  </div>
</template>
