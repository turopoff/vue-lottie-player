export default defineNuxtConfig({
  app: {
    head: {
      title: 'vue-lottie-player Nuxt 3 demo',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Nuxt 3 demo for vue-lottie-player',
        },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  devtools: {
    enabled: false,
  },
  experimental: {
    appManifest: false,
  },
})
