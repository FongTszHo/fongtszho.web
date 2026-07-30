export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  app: {
    baseURL: '/fongtszho.web/',  // ⚠️ 加上这一行！必须和你的仓库名一致
    head: {

      title: "FongTszHo's Harbor",
      htmlAttrs: {
        lang: 'zh-CN'
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: "FongTszHo's Harbor 是一个安静的个人知识空间，记录机器人、嵌入式、Linux 与 AI 工具链的学习过程。"
        }
      ],
      script: [
        {
          innerHTML: "try{const t=localStorage.getItem('harbor-theme');const d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=t||(d?'dark':'light')}catch(e){}"
        }
      ]
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },
  compatibilityDate: '2026-07-25'
})
