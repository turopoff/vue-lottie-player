import type { AnimationEventName, AnimationItem } from "lottie-web";

export const playerEmits = {
  ready: (animation: AnimationItem) => Boolean(animation),
  error: (error: Error) => error instanceof Error
};

const readyEventNames: AnimationEventName[] = [
  "config_ready",
  "data_ready",
  "DOMLoaded",
  "loaded_images"
];

export function createPlayerError(message: string): Error {
  return new Error(`[vue-lottie-player] ${message}`);
}

export function registerPlayerEvents(
  instance: AnimationItem,
  { onReady, onError }: { onReady: (animation: AnimationItem) => void; onError: (error: Error) => void }
): () => void {
  let readyEmitted = false;
  const cleanup: Array<() => void> = [];

  const emitReady = () => {
    if (readyEmitted) {
      return;
    }

    readyEmitted = true;
    onReady(instance);
  };

  const addListener = (eventName: AnimationEventName, handler: () => void) => {
    if (typeof instance.addEventListener !== "function") {
      return;
    }

    instance.addEventListener(eventName, handler);
    cleanup.push(() => {
      if (typeof instance.removeEventListener === "function") {
        instance.removeEventListener(eventName, handler);
      }
    });
  };

  readyEventNames.forEach(eventName => {
    addListener(eventName, emitReady);
  });

  addListener("data_failed", () => {
    onError(createPlayerError("Failed to load the Lottie animation."));
  });

  return () => {
    cleanup.forEach(dispose => dispose());
  };
}
