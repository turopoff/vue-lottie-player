# vue-lottie-player

Type-safe Vue 3 wrapper around `lottie-web`, with a CSP-friendly default build and an opt-in full build for expression-heavy animations.

This repository contains the published package in `src/`, shared demo animations in `examples/animations/`, and two local example apps for Vue 3 and Nuxt 3.

`vue-lottie-player` gives you:

- a Vue 3 component and plugin export
- a typed `source` API for URL- and JSON-based animations
- a default light-player build that avoids `unsafe-eval`
- a `/full` entry for animations that depend on After Effects expressions
- imperative ref controls when you need direct playback access
- straightforward Nuxt 3 integration with client-only registration

Examples and focused docs:

- [Live demo](https://turopoff.github.io/vue-lottie-player)
- [Vue example app](./examples/vue)
- [Nuxt 3 example app](./examples/nuxt)
- [Usage notes](./docs/usage.md)
- [Props reference](./docs/props.md)
- [Events reference](./docs/events.md)

## Installation

`vue` is a peer dependency and should be `^3.4.0` or newer.

```bash
npm install vue-lottie-player
```

```bash
pnpm add vue-lottie-player
```

```bash
yarn add vue-lottie-player
```

Import the bundled stylesheet once in your app:

```ts
import "vue-lottie-player/style.css";
```

## Quick Start

Use the component directly inside a Vue 3 app with the preferred `source` prop:

```vue
<script setup lang="ts">
import type { AnimationItem } from "lottie-web";
import "vue-lottie-player/style.css";
import type { LottieUrlSource } from "vue-lottie-player";
import { VueLottiePlayer } from "vue-lottie-player";

const source: LottieUrlSource = {
  kind: "url",
  value: "/animations/shape-animation.json",
};

function onReady(animation: AnimationItem) {
  animation.setSpeed(1.2);
}
</script>

<template>
  <VueLottiePlayer
    name="hero-animation"
    width="320px"
    height="320px"
    background="#f5f7fb"
    loop
    :source="source"
    @ready="onReady"
  />
</template>
```

## Global Plugin Registration

If you want `<VueLottiePlayer />` available globally:

```ts
import { createApp } from "vue";
import App from "./App.vue";
import "vue-lottie-player/style.css";
import { VueLottiePlayerPlugin } from "vue-lottie-player";

createApp(App).use(VueLottiePlayerPlugin).mount("#app");
```

## Using Imported JSON Data

The component can render imported animation JSON through `source.kind = "data"`:

```vue
<script setup lang="ts">
import { ref } from "vue";
import demoAnimation from "./assets/demo-animation.json";
import "vue-lottie-player/style.css";
import type {
  LottieDataSource,
  VueLottiePlayerInstance,
} from "vue-lottie-player";
import { VueLottiePlayer } from "vue-lottie-player";

const player = ref<VueLottiePlayerInstance | null>(null);

const source: LottieDataSource = {
  kind: "data",
  value: demoAnimation,
};

function play() {
  player.value?.play();
}

function pause() {
  player.value?.pause();
}
</script>

<template>
  <VueLottiePlayer
    ref="player"
    name="local-demo"
    width="100%"
    height="320px"
    loop
    :source="source"
  />

  <button type="button" @click="play">Play</button>
  <button type="button" @click="pause">Pause</button>
</template>
```

## Nuxt 3

Because `lottie-web` depends on browser APIs, register the plugin on the client and render the component inside `<ClientOnly>`.

`plugins/vue-lottie-player.client.ts`

```ts
import "vue-lottie-player/style.css";
import { VueLottiePlayerPlugin } from "vue-lottie-player";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueLottiePlayerPlugin);
});
```

`pages/index.vue`

```vue
<script setup lang="ts">
const source = {
  kind: "url" as const,
  value: "/animations/shape-animation.json",
};
</script>

<template>
  <ClientOnly>
    <VueLottiePlayer name="nuxt-demo" loop :source="source" />
  </ClientOnly>
</template>
```

See the working example in [examples/nuxt](./examples/nuxt).

## Default Build vs Full Build

The default package uses `lottie-web/build/player/lottie_light`, which is a better fit for environments with strict Content Security Policy rules.

If your animation relies on After Effects expressions, import from the full build instead:

```ts
import "vue-lottie-player/style.css";
import { VueLottiePlayer, VueLottiePlayerPlugin } from "vue-lottie-player/full";
```

Use the default entry unless you specifically need expression support.

## API

### Props

| Prop            | Type                          | Default         | Notes                                                        |
| --------------- | ----------------------------- | --------------- | ------------------------------------------------------------ |
| `name`          | `string`                      | auto-generated  | Optional animation name passed to `lottie-web`.              |
| `source`        | `LottieSource`                | `null`          | Preferred input for new code.                                |
| `src`           | `string`                      | `null`          | Deprecated URL/path bridge prop.                             |
| `animationData` | `object`                      | `null`          | Deprecated bridge prop for imported animation JSON.          |
| `loop`          | `boolean \| number`           | `false`         | Use `true` for infinite loop or a number for finite repeats. |
| `autoplay`      | `boolean`                     | `true`          | Starts playback immediately after load.                      |
| `renderer`      | `"svg" \| "canvas" \| "html"` | `"svg"`         | Rendering mode passed to `lottie-web`.                       |
| `width`         | `string \| number`            | `"200px"`       | Numbers are converted to `px`.                               |
| `height`        | `string \| number`            | `"200px"`       | Numbers are converted to `px`.                               |
| `background`    | `string`                      | `"transparent"` | Container background color.                                  |

### `source` Formats

Use `source` for all new integrations:

```ts
const urlSource = {
  kind: "url" as const,
  value: "/animations/intro.json",
};

const dataSource = {
  kind: "data" as const,
  value: importedAnimationJson,
};
```

Rules:

- `source` cannot be combined with `src` or `animationData`
- `src` and `animationData` cannot be combined with each other
- `src` and `animationData` still work for migration, but they emit a development warning

### Events

| Event   | Payload         | Description                                                          |
| ------- | --------------- | -------------------------------------------------------------------- |
| `ready` | `AnimationItem` | Fired once per load when the underlying animation instance is ready. |
| `error` | `Error`         | Fired when the source is invalid or the animation fails to load.     |

### Ref Methods

Access imperative controls by binding a template ref to the component:

- `play()`
- `pause()`
- `stop()`
- `setSpeed(speed)`
- `setDirection(direction)`
- `goToAndPlay(value, isFrame)`
- `goToAndStop(value, isFrame)`
- `destroy()`
- `getAnimation()`

`getAnimation()` returns the underlying `lottie-web` `AnimationItem`, so you can call the lower-level API directly when needed.

### Type Exports

The package exports the main public types:

- `LottieSource`
- `LottieUrlSource`
- `LottieDataSource`
- `VueLottiePlayerProps`
- `VueLottiePlayerInstance`

## Migrating from 0.1.x

If you are upgrading from the original Vue 2 line (`0.1.x`), these are the main API and packaging changes:

| Area               | `0.1.x`                                                                               | Current package (`2.x`)                                                                                                           | Migration                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Vue version        | Built for Vue 2 and shipped `vue` as a dependency.                                    | Vue 3 only, with `vue` as a peer dependency (`^3.4.0`).                                                                           | Upgrade the host app to Vue 3 before adopting this release.                                     |
| Package exports    | Default export component plus `Vue.use()` support.                                    | Named exports: `VueLottiePlayer` and `VueLottiePlayerPlugin`.                                                                     | Replace `import VueLottiePlayer from "vue-lottie-player"` with named imports.                   |
| Auto-install       | Tried to auto-install when global Vue was present.                                    | No global auto-install behavior.                                                                                                  | Register the plugin explicitly with `app.use(VueLottiePlayerPlugin)`.                           |
| Component name     | Global registration used `vLottiePlayer`, commonly rendered as `<v-lottie-player />`. | Global registration uses `VueLottiePlayer`.                                                                                       | Switch templates to `<VueLottiePlayer />` or `<vue-lottie-player />`.                           |
| Source props       | `path` and `animationData` were the public loading props.                             | New typed `source` prop is the preferred API; `path` is removed; `src` and `animationData` are legacy bridge props.               | Replace `path="..."` with `:source="{ kind: 'url', value: ... }"` or, temporarily, `src="..."`. |
| Events and control | `@animControl` exposed the raw lottie instance.                                       | `@ready` returns the animation instance, and the component exposes ref methods such as `play()`, `pause()`, and `getAnimation()`. | Replace `@animControl` listeners with `@ready` and/or a component ref.                          |
| Default runtime    | Used the full `lottie-web` runtime by default.                                        | Uses `lottie-web/build/player/lottie_light` by default.                                                                           | If an animation depends on After Effects expressions, import from `vue-lottie-player/full`.     |
| Public entrypoints | Consumers could reach package internals such as `src/index.js`.                       | Package exports are now limited to documented entrypoints.                                                                        | Use only `vue-lottie-player`, `vue-lottie-player/full`, and `vue-lottie-player/style.css`.      |

Additional migration notes:

- `source`, `src`, and `animationData` are now validated more strictly; invalid combinations emit an `error` event instead of silently continuing
- Nuxt usage should stay client-only because `lottie-web` depends on browser APIs
- `loop`, `autoplay`, `renderer`, `width`, `height`, and `background` keep the same general behavior, so most markup changes are around registration, source props, and control flow

For new code, prefer `source` and the named exports exclusively.

## Local Development

This repo ships the library package together with two local demos:

- `examples/vue` resolves `vue-lottie-player` to `src/entry.ts`, so it always runs against the latest source files
- `examples/nuxt` depends on `file:../..`, so rebuild the package after source changes when you want Nuxt to consume the latest packaged output
- `examples/animations` stores the shared JSON assets used by both demos

Install dependencies, then type-check and build the package:

```bash
npm install
npm run typecheck
npm run build
```

Run the Vue example from the package root:

```bash
npm run dev:vue
```

Or work inside each example app directly:

```bash
cd examples/vue
npm install
npm run dev
```

```bash
cd examples/nuxt
npm install
npm run dev
```

Relevant project areas:

- `src/components/` for the exported Vue components
- `src/core/` for source resolution, runtime selection, and event wiring
- `src/styles/index.css` for package styles
- `examples/animations/` for the shared demo JSON files
- `examples/vue/` for the Vite example app
- `examples/nuxt/` for the Nuxt 3 example app
- `docs/` for focused usage, props, and events references

## License

[MIT](./LICENSE)
