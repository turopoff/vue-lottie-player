import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/full.ts"),
      name: "VueLottiePlayer",
      formats: ["es", "cjs"],
      fileName: format => (format === "es" ? "full.js" : "full.cjs")
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
