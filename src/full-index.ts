import type { App, Plugin } from "vue";
import VueLottiePlayerComponent from "./components/VLottiePlayerFull.vue";

const VueLottiePlayerPlugin: Plugin = {
  install(app: App) {
    app.component("VueLottiePlayer", VueLottiePlayerComponent);
  }
};

const VueLottiePlayer = VueLottiePlayerComponent;

export { VueLottiePlayer, VueLottiePlayerPlugin };
export type {
  LottieDataSource,
  LottieSource,
  LottieUrlSource,
  VueLottiePlayerInstance,
  VueLottiePlayerProps
} from "./types.js";
