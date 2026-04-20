import type {
  AnimationConfigWithData,
  AnimationDirection,
  AnimationItem,
  RendererType
} from "lottie-web";

export type LottieAnimationData = NonNullable<AnimationConfigWithData["animationData"]>;

export type LottieUrlSource = {
  kind: "url";
  value: string;
};

export type LottieDataSource = {
  kind: "data";
  value: LottieAnimationData;
};

export type LottieSource = LottieUrlSource | LottieDataSource;

export interface VueLottiePlayerSharedProps {
  name?: string;
  width?: string | number;
  height?: string | number;
  background?: string;
  loop?: boolean | number;
  autoplay?: boolean;
  renderer?: RendererType;
}

export type VueLottiePlayerProps = VueLottiePlayerSharedProps &
  (
    | {
        source: LottieSource;
        src?: never;
        animationData?: never;
      }
    | {
        source?: null | undefined;
        src: string;
        animationData?: never;
      }
    | {
        source?: null | undefined;
        src?: never;
        animationData: LottieAnimationData;
      }
  );

export interface VueLottiePlayerInstance {
  play(): void;
  pause(): void;
  stop(): void;
  setSpeed(speed: number): void;
  setDirection(direction: AnimationDirection): void;
  goToAndPlay(value: number | string, isFrame?: boolean): void;
  goToAndStop(value: number | string, isFrame?: boolean): void;
  destroy(): void;
  getAnimation(): AnimationItem | null;
}
