import type { AnimationItem } from "lottie-web";
import type { RuntimePlayerProps } from "./props.js";
export declare function createAnimationPlayer({ container, props }: {
    container: Element | null;
    props: RuntimePlayerProps;
}): Promise<AnimationItem>;
