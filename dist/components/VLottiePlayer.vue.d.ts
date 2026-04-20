import type { AnimationItem } from "lottie-web";
import type { CSSProperties } from "vue";
declare const _default: typeof __VLS_export;
export default _default;
declare const __VLS_export: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
        default: typeof import("../core/props.js").createDefaultName;
    };
    width: {
        type: import("vue").PropType<string | number>;
        default: string;
    };
    height: {
        type: import("vue").PropType<string | number>;
        default: string;
    };
    background: {
        type: StringConstructor;
        default: string;
    };
    loop: {
        type: import("vue").PropType<number | boolean>;
        default: boolean;
    };
    autoplay: {
        type: BooleanConstructor;
        default: boolean;
    };
    renderer: {
        type: import("vue").PropType<import("lottie-web").RendererType>;
        default: string;
    };
    source: {
        type: import("vue").PropType<import("../types.js").LottieSource | null>;
        default: null;
    };
    src: {
        type: StringConstructor;
        default: null;
    };
    animationData: {
        type: import("vue").PropType<any>;
        default: null;
    };
}>, {
    animContainer: import("vue").Ref<HTMLDivElement | null, HTMLDivElement | null>;
    style: import("vue").ComputedRef<CSSProperties>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    ready: (animation: AnimationItem) => boolean;
    error: (error: Error) => boolean;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
        default: typeof import("../core/props.js").createDefaultName;
    };
    width: {
        type: import("vue").PropType<string | number>;
        default: string;
    };
    height: {
        type: import("vue").PropType<string | number>;
        default: string;
    };
    background: {
        type: StringConstructor;
        default: string;
    };
    loop: {
        type: import("vue").PropType<number | boolean>;
        default: boolean;
    };
    autoplay: {
        type: BooleanConstructor;
        default: boolean;
    };
    renderer: {
        type: import("vue").PropType<import("lottie-web").RendererType>;
        default: string;
    };
    source: {
        type: import("vue").PropType<import("../types.js").LottieSource | null>;
        default: null;
    };
    src: {
        type: StringConstructor;
        default: null;
    };
    animationData: {
        type: import("vue").PropType<any>;
        default: null;
    };
}>> & Readonly<{
    onError?: ((error: Error) => any) | undefined;
    onReady?: ((animation: AnimationItem) => any) | undefined;
}>, {
    animationData: any;
    src: string;
    source: import("../types.js").LottieSource | null;
    name: string;
    width: string | number;
    height: string | number;
    background: string;
    loop: number | boolean;
    autoplay: boolean;
    renderer: import("lottie-web").RendererType;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
