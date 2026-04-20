import type { AnimationItem, LottiePlayer } from "lottie-web";
import { createPlayerError } from "./events.js";
import { resolvePlayerSource } from "./props.js";
import type { RuntimePlayerProps } from "./props.js";

let lottieLoader: Promise<unknown> | null = null;

function getLottie(): Promise<LottiePlayer> {
  if (!lottieLoader) {
    lottieLoader = import("lottie-web/build/player/lottie_light");
  }

  return lottieLoader.then(module => {
    return (module as { default?: LottiePlayer }).default || (module as LottiePlayer);
  });
}

export async function createAnimationPlayer({
  container,
  props
}: {
  container: Element | null;
  props: RuntimePlayerProps;
}): Promise<AnimationItem> {
  if (!container) {
    throw createPlayerError("Animation container is not available.");
  }

  const source = resolvePlayerSource(props);
  const lottie = await getLottie();

  return lottie.loadAnimation({
    container,
    name: props.name,
    renderer: props.renderer,
    loop: props.loop,
    autoplay: props.autoplay,
    path: source.kind === "url" ? source.value : undefined,
    animationData: source.kind === "data" ? source.value : undefined
  });
}
