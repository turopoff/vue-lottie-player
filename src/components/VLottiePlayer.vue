<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from "vue";
import type { AnimationDirection, AnimationItem } from "lottie-web";
import type { CSSProperties } from "vue";
import { createAnimationPlayer } from "../core/createPlayer.js";
import { playerEmits, registerPlayerEvents } from "../core/events.js";
import { normalizeSize, playerProps } from "../core/props.js";
import type { VueLottiePlayerInstance } from "../types.js";

export default defineComponent({
  name: "VueLottiePlayer",
  props: playerProps,
  emits: playerEmits,

  setup(props, { emit, expose }) {
    const animContainer = ref<HTMLDivElement | null>(null);
    const animation = ref<AnimationItem | null>(null);
    const style = computed<CSSProperties>(() => ({
      width: normalizeSize(props.width),
      height: normalizeSize(props.height),
      background: props.background
    }));
    const isMounted = ref(false);
    let readyCleanup: (() => void) | null = null;
    let loadToken = 0;

    const emitError = (error: unknown) => {
      emit("error", error instanceof Error ? error : new Error(String(error)));
    };

    const clearReadyCleanup = () => {
      if (typeof readyCleanup === "function") {
        readyCleanup();
        readyCleanup = null;
      }
    };

    const destroyAnimation = () => {
      clearReadyCleanup();

      if (animation.value) {
        animation.value.destroy();
        animation.value = null;
      }
    };

    const loadAnimation = async (): Promise<void> => {
      const currentLoadToken = ++loadToken;

      destroyAnimation();

      try {
        const instance = await createAnimationPlayer({
          container: animContainer.value,
          props
        });

        if (!isMounted.value || currentLoadToken !== loadToken) {
          instance.destroy();
          return;
        }

        animation.value = instance;
        readyCleanup = registerPlayerEvents(instance, {
          onReady: (createdAnimation: AnimationItem) => {
            emit("ready", createdAnimation);
          },
          onError: emitError
        });
      } catch (error) {
        destroyAnimation();
        emitError(error);
      }
    };

    const play = () => {
      animation.value?.play();
    };

    const pause = () => {
      animation.value?.pause();
    };

    const stop = () => {
      animation.value?.stop();
    };

    const setSpeed = (speed: number) => {
      animation.value?.setSpeed(speed);
    };

    const setDirection = (direction: AnimationDirection) => {
      animation.value?.setDirection(direction);
    };

    const goToAndPlay = (value: number | string, isFrame?: boolean) => {
      animation.value?.goToAndPlay(value, isFrame);
    };

    const goToAndStop = (value: number | string, isFrame?: boolean) => {
      animation.value?.goToAndStop(value, isFrame);
    };

    const destroy = () => {
      loadToken += 1;
      destroyAnimation();
    };

    const getAnimation = () => animation.value;

    const exposedControls: VueLottiePlayerInstance = {
      play,
      pause,
      stop,
      setSpeed,
      setDirection,
      goToAndPlay,
      goToAndStop,
      destroy,
      getAnimation
    };

    expose(exposedControls);

    onMounted(() => {
      isMounted.value = true;
      void loadAnimation();
    });

    onBeforeUnmount(() => {
      isMounted.value = false;
      loadToken += 1;
      destroyAnimation();
    });

    watch(
      () => props.loop,
      value => {
        if (animation.value) {
          animation.value.loop = value;
        }
      }
    );

    watch(
      () => [props.width, props.height],
      async () => {
        await nextTick();
        animation.value?.resize?.();
      }
    );

    watch(
      () => [props.source, props.src, props.animationData, props.renderer],
      () => {
        if (isMounted.value) {
          void loadAnimation();
        }
      },
      {
        deep: true
      }
    );

    return {
      animContainer,
      style
    };
  }
});
</script>

<template>
  <div class="vue-lottie-player" :style="style" ref="animContainer"></div>
</template>
