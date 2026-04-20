import type { PropType } from "vue";
import type { RendererType } from "lottie-web";
import type { LottieAnimationData, LottieSource } from "../types.js";
export interface RuntimePlayerProps {
    name: string;
    width: string | number;
    height: string | number;
    background: string;
    loop: boolean | number;
    autoplay: boolean;
    renderer: RendererType;
    source: LottieSource | null;
    src: string | null;
    animationData: LottieAnimationData | null;
}
export declare function createDefaultName(): string;
export declare function normalizeSize(size: string | number): string;
export declare function resolvePlayerSource(props: Pick<RuntimePlayerProps, "source" | "src" | "animationData">): LottieSource;
export declare const playerProps: {
    name: {
        type: StringConstructor;
        default: typeof createDefaultName;
    };
    width: {
        type: PropType<string | number>;
        default: string;
    };
    height: {
        type: PropType<string | number>;
        default: string;
    };
    background: {
        type: StringConstructor;
        default: string;
    };
    loop: {
        type: PropType<number | boolean>;
        default: boolean;
    };
    autoplay: {
        type: BooleanConstructor;
        default: boolean;
    };
    renderer: {
        type: PropType<RendererType>;
        default: string;
    };
    source: {
        type: PropType<LottieSource | null>;
        default: null;
    };
    src: {
        type: StringConstructor;
        default: null;
    };
    animationData: {
        type: PropType<any>;
        default: null;
    };
};
