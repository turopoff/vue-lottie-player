<script setup lang="ts">
import type { AnimationItem } from 'lottie-web'
import { computed, ref, watch } from 'vue'
import scooterAnimation from '../../animations/scooter.json'
import type {
  LottieDataSource,
  LottieUrlSource,
  VueLottiePlayerInstance,
} from 'vue-lottie-player'

defineOptions({
  name: 'NuxtDemoHomePage',
})

const remoteSources = [
  {
    label: 'Shape animation',
    url: 'https://raw.githubusercontent.com/turopoff/vue-lottie-player/vue3/examples/animations/shape-animation.json',
  },
  {
    label: 'Scooter',
    url: 'https://raw.githubusercontent.com/turopoff/vue-lottie-player/vue3/examples/animations/scooter.json',
  },
]

const remoteSourceIndex = ref(0)
const speed = ref<number>(1)
const remotePlayer = ref<VueLottiePlayerInstance | null>(null)
const localPlayer = ref<VueLottiePlayerInstance | null>(null)
const remoteReadyCount = ref(0)
const localReadyCount = ref(0)
const lastError = ref('')

const activeRemoteSource = computed(
  () => remoteSources[remoteSourceIndex.value],
)
const activeRemotePlayerSource = computed<LottieUrlSource>(() => ({
  kind: 'url',
  value: activeRemoteSource.value.url,
}))
const localAnimationSource: LottieDataSource = {
  kind: 'data',
  value: scooterAnimation,
}
const playersReady = computed(
  () => remoteReadyCount.value > 0 && localReadyCount.value > 0,
)

const applySpeed = () => {
  remotePlayer.value?.setSpeed(speed.value)
  localPlayer.value?.setSpeed(speed.value)
}

const onRemoteReady = (animation: AnimationItem) => {
  remoteReadyCount.value += 1
  animation.setSpeed(speed.value)
}

const onLocalReady = (animation: AnimationItem) => {
  localReadyCount.value += 1
  animation.setSpeed(speed.value)
}

const onError = (scope: string, error: Error) => {
  lastError.value = `${scope}: ${error.message}`
}

const swapRemoteSource = () => {
  remoteSourceIndex.value = remoteSourceIndex.value === 0 ? 1 : 0
}

const playAll = () => {
  remotePlayer.value?.play()
  localPlayer.value?.play()
}

const pauseAll = () => {
  remotePlayer.value?.pause()
  localPlayer.value?.pause()
}

const stopAll = () => {
  remotePlayer.value?.stop()
  localPlayer.value?.stop()
}

const getSafeSeekFrame = (playerRef: typeof remotePlayer, targetFrame = 45) => {
  const animation = playerRef.value?.getAnimation?.()

  if (!animation) {
    return null
  }

  const firstFrame = Number(animation.firstFrame ?? 0)
  const totalFrames = Number(animation.totalFrames ?? 0)
  const lastFrame = Math.max(firstFrame, firstFrame + totalFrames - 1)

  return Math.min(targetFrame, lastFrame)
}

const seekPreviewFrame = () => {
  const remoteFrame = getSafeSeekFrame(remotePlayer)
  const localFrame = getSafeSeekFrame(localPlayer)

  if (remoteFrame !== null) {
    remotePlayer.value?.goToAndStop(remoteFrame, true)
  }

  if (localFrame !== null) {
    localPlayer.value?.goToAndStop(localFrame, true)
  }
}

watch(speed, applySpeed)
</script>

<template>
  <main class="demo-shell">
    <section class="hero">
      <p class="eyebrow">Nuxt 3 demo</p>
      <h1>vue-lottie-player</h1>
      <p class="lede">
        This Nuxt 3 page mirrors the Vue example, while keeping the player
        client-only through Nuxt plugin registration and
        <code>&lt;ClientOnly&gt;</code>.
      </p>
    </section>

    <ClientOnly>
      <section class="panel-grid">
        <article class="panel">
          <div class="panel-header">
            <div>
              <p class="panel-label">Remote source</p>
              <h2>{{ activeRemoteSource.label }}</h2>
            </div>
            <button
              class="ghost-button"
              type="button"
              @click="swapRemoteSource"
            >
              Swap remote source
            </button>
          </div>
          <VueLottiePlayer
            ref="remotePlayer"
            name="remote-demo"
            width="100%"
            height="320px"
            background="#f3f7ff"
            loop
            :source="activeRemotePlayerSource"
            @ready="onRemoteReady"
            @error="onError('Remote player', $event)"
          />
          <p class="meta">
            Ready events: <strong>{{ remoteReadyCount }}</strong>
          </p>
        </article>

        <article class="panel">
          <div class="panel-header">
            <div>
              <p class="panel-label">Local source</p>
              <h2>Bundled asset</h2>
            </div>
            <span class="status-chip">source:data</span>
          </div>
          <VueLottiePlayer
            ref="localPlayer"
            name="local-demo"
            width="100%"
            height="320px"
            background="#fff7ed"
            loop
            :source="localAnimationSource"
            @ready="onLocalReady"
            @error="onError('Local player', $event)"
          />
          <p class="meta">
            Ready events: <strong>{{ localReadyCount }}</strong>
          </p>
        </article>
      </section>

      <section class="controls">
        <div class="controls-header">
          <div>
            <p class="panel-label">Ref controls</p>
            <h2>Playback API</h2>
          </div>
          <span class="status-chip" :class="{ live: playersReady }">
            {{ playersReady ? 'ready' : 'loading' }}
          </span>
        </div>

        <label class="speed-control">
          <span>Speed: {{ speed.toFixed(1) }}x</span>
          <input
            v-model.number="speed"
            type="range"
            min="0.2"
            max="3"
            step="0.1"
          />
        </label>

        <div class="button-row">
          <button type="button" @click="playAll">Play</button>
          <button type="button" @click="pauseAll">Pause</button>
          <button type="button" @click="stopAll">Stop</button>
          <button type="button" @click="seekPreviewFrame">
            Seek preview frame
          </button>
        </div>

        <p v-if="lastError" class="error-message">{{ lastError }}</p>
      </section>
    </ClientOnly>
  </main>
</template>

<style scoped>
:global(body) {
  margin: 0;
  background:
    radial-gradient(
      circle at top left,
      rgba(111, 183, 255, 0.35),
      transparent 38%
    ),
    radial-gradient(
      circle at top right,
      rgba(250, 204, 21, 0.22),
      transparent 28%
    ),
    #f5f1ea;
  color: #192231;
  font-family: 'Segoe UI', sans-serif;
}

:global(*) {
  box-sizing: border-box;
}

:global(button),
:global(input) {
  font: inherit;
}

.demo-shell {
  max-width: 1180px;
  margin: 0 auto;
  padding: 24px 24px 88px;
}

.hero {
  margin-bottom: 36px;
}

.eyebrow,
.panel-label {
  margin: 0 0 8px;
  color: #8b5e3c;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.hero h1,
.controls-header h2,
.panel h2 {
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 600;
}

.hero h1 {
  font-size: clamp(3rem, 7vw, 5.6rem);
  line-height: 0.95;
}

.lede {
  max-width: 620px;
  margin: 18px 0 0;
  color: #405065;
  font-size: 1.08rem;
  line-height: 1.7;
}

.panel-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.panel,
.controls {
  border: 1px solid rgba(25, 34, 49, 0.08);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 24px 80px rgba(36, 43, 58, 0.08);
  backdrop-filter: blur(14px);
}

.panel {
  padding: 24px;
}

.controls {
  margin-top: 20px;
  padding: 24px;
}

.panel-header,
.controls-header,
.button-row {
  display: flex;
  gap: 12px;
  justify-content: space-between;
}

.panel-header,
.controls-header {
  align-items: flex-start;
  margin-bottom: 18px;
}

.ghost-button,
.button-row button {
  border: none;
  border-radius: 999px;
  background: #192231;
  color: #ffffff;
  cursor: pointer;
  transition:
    transform 0.16s ease,
    opacity 0.16s ease;
}

.ghost-button {
  padding: 12px 18px;
  font-size: 0.92rem;
}

.button-row button {
  padding: 12px 18px;
}

.ghost-button:hover,
.button-row button:hover {
  transform: translateY(-1px);
  opacity: 0.92;
}

.status-chip {
  align-self: center;
  padding: 8px 12px;
  border-radius: 999px;
  background: #ece7de;
  color: #4f5d73;
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.status-chip.live {
  background: #dff7e8;
  color: #17603a;
}

.meta {
  margin: 14px 0 0;
  color: #516075;
}

.speed-control {
  display: grid;
  gap: 10px;
  margin-top: 18px;
  margin-bottom: 20px;
}

.speed-control input {
  width: 100%;
}

.button-row {
  flex-wrap: wrap;
}

.error-message {
  margin: 18px 0 0;
  color: #912018;
}

@media (max-width: 900px) {
  .panel-grid {
    grid-template-columns: 1fr;
  }

  .panel-header,
  .controls-header {
    flex-direction: column;
  }

  .ghost-button {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .demo-shell {
    padding: 24px 16px 64px;
  }

  .button-row button {
    width: 100%;
  }
}
</style>
