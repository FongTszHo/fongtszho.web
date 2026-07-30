<script setup lang="ts">
import {
  siBilibili,
  siGithub,
  siGmail,
  siQq,
  siTelegram,
  siTiktok,
  siWechat
} from 'simple-icons'

type Contact = {
  key: string
  icon: typeof siGithub
  label: string
  href?: string
  copyValue?: string
}

const contacts: Contact[] = [
  {
    key: 'github',
    icon: siGithub,
    label: 'GitHub',
    href: 'https://github.com/Lucas-Fang'
  },
  {
    key: 'qq',
    icon: siQq,
    label: 'QQ',
    copyValue: '1816072827'
  },
  {
    key: 'wechat',
    icon: siWechat,
    label: 'WeChat'
  },
  {
    key: 'gmail',
    icon: siGmail,
    label: 'Gmail',
    href: 'mailto:luckpark20@gmail.com'
  },
  {
    key: 'telegram',
    icon: siTelegram,
    label: 'Telegram'
  },
  {
    key: 'bilibili',
    icon: siBilibili,
    label: 'BiliBili'
  },
  {
    key: 'douyin',
    icon: siTiktok,
    label: 'Tiktok'
  }
]

const copiedKey = ref<string | null>(null)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

const copyContact = async (contact: Contact) => {
  if (!contact.copyValue) return

  await navigator.clipboard.writeText(contact.copyValue)
  copiedKey.value = contact.key
  if (copiedTimer) clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => {
    copiedKey.value = null
  }, 1600)
}

onBeforeUnmount(() => {
  if (copiedTimer) clearTimeout(copiedTimer)
})
</script>

<template>
  <div class="contact-loop" role="region" aria-label="联系方式">
    <div class="contact-loop-track">
      <ul v-for="copyIndex in 4" :key="copyIndex" class="contact-loop-list" :aria-hidden="copyIndex > 1">
        <li v-for="contact in contacts" :key="`${copyIndex}-${contact.key}`" class="contact-loop-item">
          <a
            v-if="contact.href"
            class="contact-loop-link"
            :href="contact.href"
            :target="contact.href.startsWith('http') ? '_blank' : undefined"
            :rel="contact.href.startsWith('http') ? 'noreferrer noopener' : undefined"
            :tabindex="copyIndex > 1 ? -1 : undefined"
          >
            <svg class="contact-brand-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path :d="contact.icon.path" />
            </svg>
            <span>{{ contact.label }}</span>
          </a>

          <button
            v-else-if="contact.copyValue"
            class="contact-loop-link"
            type="button"
            :aria-label="`复制 ${contact.label} 账号`"
            :tabindex="copyIndex > 1 ? -1 : undefined"
            @click="copyContact(contact)"
          >
            <svg class="contact-brand-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path :d="contact.icon.path" />
            </svg>
            <span>{{ copiedKey === contact.key ? '已复制' : contact.label }}</span>
          </button>

          <span v-else class="contact-loop-link is-pending" :title="`${contact.label} 账号待补充`">
            <svg class="contact-brand-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path :d="contact.icon.path" />
            </svg>
            <span>{{ contact.label }}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
