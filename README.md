# Lottie Animation Player for Vue | [demo](https://turopoff.github.io/vue-lottie-player/demo/dist)

## Why Lottie?

#### Flexible After Effects features

We currently support solids, shape layers, masks, alpha mattes, trim paths, and dash patterns. And we’ll be adding new features on a regular basis.

#### Manipulate your animation any way you like

You can go forward, backward, and most importantly you can program your animation to respond to any interaction.

#### Small file sizes

Bundle vector animations within your app without having to worry about multiple dimensions or large file sizes. Alternatively, you can decouple animation files from your app’s code entirely by loading them from a JSON API.

[Learn more](http://airbnb.design/introducing-lottie/) › http://airbnb.design/lottie/

Looking for lottie files › https://www.lottiefiles.com/

## Installation

Install [vue-lottie-player](https://www.npmjs.com/package/vue-lottie-player)

```
npm install --save vue-lottie-player
```

Or

```
yarn add vue-lottie-player
```

## Initialization

Include in it either globally (in main.js) or a Vue component.\

Global:

```js
// main.js
import Vue from "vue";

import VueLottiePlayer from "vue-lottie-player";
Vue.use(VueLottiePlayer);
```

Component:

```js
import VueLottiePlayer from "vue-lottie-player";
export default {
  components: {
    vLottiePlayer: VueLottiePlayer
  }
//...
```

## Usage

```vue
<script>
import VueLottiePlayer from "vue-lottie-player";
export default {
  name: "MyComponent",
  components: {
    vLottiePlayer: VueLottiePlayer
  }
};
</script>

<template>
  <div>
    <div>
      <h3>From url</h3>
      <v-lottie-player
        name="scooterAnim"
        loop
        path="https://assets2.lottiefiles.com/packages/lf20_hu2LUv.json"
      />
    </div>
    OR
    <div>
      <h3>From local</h3>
      <vLottiePlayer
        name="workoutMonkeyAnim"
        loop
        :animationData="require('./assets/workout-monkey.json')"
      />
    </div>
  </div>
</template>
```

## Configuration

Props:

- name: animation name for future reference
- animationData: animation JSON.
  ```
  <v-lottie-player :animationData="require('./assets/workout-monkey.json')" />
  ```
- path: the relative path to the animation JSON. (animationData and path are mutually exclusive)
  ```
  <v-lottie-player path="https://assets2.lottiefiles.com/packages/lf20_hu2LUv.json" />
  ```
- loop: true / false / number (default: false)
- autoplay: true / false it will start playing as soon as it is ready (default: true)
- renderer: 'svg' / 'canvas' / 'html' to set the renderer (default: 'svg')
- width: player width (default: 200px)
- height: player height (default: 200px)
- background: player background (default: transparent)
- @animControl: Returns the lottie-web animation controller for custom event hookup & direct access to the lottie instance.

## NuxtJs
https://github.com/turopoff/vue-lottie-player-nuxt-demo
