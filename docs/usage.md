# Usage

## Install

```bash
npm install vue-lottie-player
```

## Local Component Import

```vue
<script setup lang="ts">
import type { AnimationItem } from "lottie-web";
import { ref } from "vue";
import "vue-lottie-player/style.css";
import type {
  LottieUrlSource,
  VueLottiePlayerInstance
} from "vue-lottie-player";
import { VueLottiePlayer } from "vue-lottie-player";

const player = ref<VueLottiePlayerInstance | null>(null);
const source: LottieUrlSource = {
  kind: "url",
  value: "https://assets2.lottiefiles.com/packages/lf20_hu2LUv.json"
};

function onReady(animation: AnimationItem) {
  animation.setSpeed(1.25);
}
</script>

<template>
  <VueLottiePlayer
    ref="player"
    name="rocket"
    loop
    :source="source"
    @ready="onReady"
  />
</template>
```

## Plugin Registration

```ts
import { createApp } from "vue";
import App from "./App.vue";
import "vue-lottie-player/style.css";
import { VueLottiePlayerPlugin } from "vue-lottie-player";

createApp(App).use(VueLottiePlayerPlugin).mount("#app");
```

## Full Build Import

```ts
import "vue-lottie-player/style.css";
import { VueLottiePlayer, VueLottiePlayerPlugin } from "vue-lottie-player/full";
```

## Nuxt Client Plugin

```ts
import "vue-lottie-player/style.css";
import { VueLottiePlayerPlugin } from "vue-lottie-player";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueLottiePlayerPlugin);
});
```

```vue
<script setup lang="ts">
const remoteAnimationSource = {
  kind: "url" as const,
  value: "https://assets2.lottiefiles.com/packages/lf20_hu2LUv.json"
};
</script>

<template>
  <ClientOnly>
    <VueLottiePlayer name="nuxt-demo" loop :source="remoteAnimationSource" />
  </ClientOnly>
</template>
```

The published package ships its base styles at `vue-lottie-player/style.css`.
The default package uses `lottie-web`'s light build so it works in strict CSP
environments without `unsafe-eval`. If you need After Effects expression
support, import from `vue-lottie-player/full` explicitly.

`src` and `animationData` remain available as deprecated bridge props for migration. Do not combine them with `source`.
