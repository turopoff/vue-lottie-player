import type { PropType } from "vue";
import type { RendererType } from "lottie-web";
import { createPlayerError } from "./events.js";
import type {
  LottieAnimationData,
  LottieSource,
  LottieUrlSource
} from "../types.js";

const sizeProp = [String, Number] as unknown as PropType<string | number>;
const loopProp = [Boolean, Number] as unknown as PropType<boolean | number>;
const animationDataProp = Object as PropType<LottieAnimationData | null>;
const sourceProp = Object as PropType<LottieSource | null>;

const deprecatedPropWarnings = new Set<"src" | "animationData">();

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

function isDevelopmentEnvironment(): boolean {
  const runtimeProcess = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process;

  return (
    Boolean(import.meta.env?.DEV) ||
    (typeof runtimeProcess !== "undefined" && runtimeProcess.env?.NODE_ENV !== "production")
  );
}

function warnDeprecatedProp(propName: "src" | "animationData"): void {
  if (!isDevelopmentEnvironment() || deprecatedPropWarnings.has(propName)) {
    return;
  }

  deprecatedPropWarnings.add(propName);
  console.warn(`[vue-lottie-player] \`${propName}\` is deprecated. Use \`source\` instead.`);
}

function validateExplicitSource(source: LottieSource): void {
  if (source.kind === "url") {
    if (typeof source.value !== "string" || source.value.length === 0) {
      throw createPlayerError("`source.value` must be a non-empty string when `source.kind` is `url`.");
    }

    return;
  }

  if (source.kind === "data") {
    if (source.value == null) {
      throw createPlayerError("`source.value` must be provided when `source.kind` is `data`.");
    }

    return;
  }

  throw createPlayerError("`source.kind` must be either `url` or `data`.");
}

export function createDefaultName(): string {
  return `lottie-${Math.random().toString(36).slice(2)}`;
}

export function normalizeSize(size: string | number): string {
  return typeof size === "number" ? `${size}px` : size;
}

export function resolvePlayerSource(
  props: Pick<RuntimePlayerProps, "source" | "src" | "animationData">
): LottieSource {
  const hasSource = props.source !== null;
  const hasSrc = Boolean(props.src);
  const hasAnimationData = props.animationData !== null;

  if (hasSource && (hasSrc || hasAnimationData)) {
    throw createPlayerError("`source` cannot be used together with `src` or `animationData`.");
  }

  if (hasSource) {
    validateExplicitSource(props.source as LottieSource);
    return props.source as LottieSource;
  }

  if (hasSrc && hasAnimationData) {
    throw createPlayerError("`src` and `animationData` cannot be used together.");
  }

  if (hasSrc) {
    warnDeprecatedProp("src");
    return {
      kind: "url",
      value: props.src as string
    } satisfies LottieUrlSource;
  }

  if (hasAnimationData) {
    warnDeprecatedProp("animationData");
    return {
      kind: "data",
      value: props.animationData as LottieAnimationData
    };
  }

  throw createPlayerError("Provide `source`, or use the deprecated `src` / `animationData` bridge props.");
}

export const playerProps = {
  name: {
    type: String,
    default: createDefaultName
  },
  width: {
    type: sizeProp,
    default: "200px"
  },
  height: {
    type: sizeProp,
    default: "200px"
  },
  background: {
    type: String,
    default: "transparent"
  },
  loop: {
    type: loopProp,
    default: false
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  renderer: {
    type: String as PropType<RendererType>,
    default: "svg"
  },
  source: {
    type: sourceProp,
    default: null
  },
  src: {
    type: String,
    default: null
  },
  animationData: {
    type: animationDataProp,
    default: null
  }
};
