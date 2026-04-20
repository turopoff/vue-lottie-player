import 'vue-lottie-player/style.css'
import { VueLottiePlayerPlugin } from 'vue-lottie-player'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueLottiePlayerPlugin)
})
