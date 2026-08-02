<script setup lang="ts">
const route = useRoute()
const mobileMenuOpen = ref(false)

const navItems = [
  { label: 'HOME', to: '/' },
  { label: '博客', to: '/blog' },
  { label: 'Wiki', to: '/wiki' },
  { label: '项目', to: '/projects' },
  { label: '关于', to: '/about' }
]

const showReadingProgress = computed(() =>
  /^\/(?:wiki|blog|projects)\/.+/.test(route.path)
)

watch(() => route.fullPath, () => {
  mobileMenuOpen.value = false
})
</script>

<template>
  <div class="site-shell">
    <ReadingProgress v-if="showReadingProgress" />
    <GalaxyBackground />

    <header class="site-header">
      <NuxtLink class="brand" to="/" aria-label="FongTszHo Harbor 首页">
        <SiteAvatar />
        <span class="mobile-wordmark">Tsz_Ho</span>
      </NuxtLink>

      <div class="header-actions">
        <nav class="nav-links" :class="{ 'is-open': mobileMenuOpen }" aria-label="主导航">
          <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to">
            {{ item.label }}
          </NuxtLink>
        </nav>
        <div class="header-controls">
          <ThemeToggle />
          <button
            class="mobile-menu-toggle"
            type="button"
            :aria-expanded="mobileMenuOpen"
            aria-label="切换导航菜单"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <footer class="site-footer">
      <div class="footer-contact">
        <p>欢迎联系</p>
        <ContactLoop />
      </div>
      <div class="footer-meta">
        <span>FongTszHo's Harbor</span>
        <span>一处记录机器人、嵌入式与个人学习过程的安静港湾。</span>
      </div>
    </footer>
  </div>
</template>
