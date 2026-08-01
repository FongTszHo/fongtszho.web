<script setup lang="ts">
const route = useRoute()

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
</script>

<template>
  <div class="site-shell">
    <ReadingProgress v-if="showReadingProgress" />
    <GalaxyBackground />

    <header class="site-header">
      <NuxtLink class="brand" to="/" aria-label="FongTszHo Harbor 首页">
        <SiteAvatar />
      </NuxtLink>

      <div class="header-actions">
        <nav class="nav-links" aria-label="主导航">
          <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to">
            {{ item.label }}
          </NuxtLink>
        </nav>
        <ThemeToggle />
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
