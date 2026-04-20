import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/entry.ts"),
      name: "VueLottiePlayer",
      formats: ["es", "cjs"],
      fileName: format =>
        format === "es" ? "vue-lottie-player.js" : "vue-lottie-player.cjs"
    },
    rollupOptions: {
      external: id => id === "vue" || id === "lottie-web" || id.startsWith("lottie-web/"),
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  }
});
