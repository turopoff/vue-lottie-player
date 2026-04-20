import type { AnimationItem } from "lottie-web";
export declare const playerEmits: {
    ready: (animation: AnimationItem) => boolean;
    error: (error: Error) => boolean;
};
export declare function createPlayerError(message: string): Error;
export declare function registerPlayerEvents(instance: AnimationItem, { onReady, onError }: {
    onReady: (animation: AnimationItem) => void;
    onError: (error: Error) => void;
}): () => void;
