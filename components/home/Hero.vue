<script setup lang="ts">
const greeting = ref('你好，欢迎来到')
let greetingTimer: ReturnType<typeof setInterval> | undefined

const updateGreeting = () => {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 12) {
    greeting.value = '早上好，欢迎来到'
  } else if (hour >= 12 && hour < 18) {
    greeting.value = '下午好，欢迎来到'
  } else {
    greeting.value = '晚上好，欢迎来到'
  }
}

onMounted(() => {
  updateGreeting()
  greetingTimer = setInterval(updateGreeting, 60_000)
})

onBeforeUnmount(() => {
  if (greetingTimer) clearInterval(greetingTimer)
})
</script>

<template>
  <section class="harbor-hero">
    <div class="hero-inner">
      <p class="hero-kicker">{{ greeting }}</p>
      <h1>
        <TrueFocus
          sentence="FongTszHo's Harbor"
          :blur-amount="2.2"
          :animation-duration="0.55"
          :pause-between-animations="1.25"
        />
      </h1>
      <p class="hero-lead">
        这里保存着我学习机器人、嵌入式、Linux 与软件开发过程中留下的笔记。
      </p>
      <p class="hero-note">
        这里记录项目过程、技术探索，以及未来自己可能再次需要查看的答案。
      </p>
      <div class="hero-actions">
        <NuxtLink class="button button-primary" to="/wiki">进入 Wiki</NuxtLink>
        <NuxtLink class="button button-ghost" to="/projects">查看项目</NuxtLink>
      </div>
    </div>
  </section>
</template>
