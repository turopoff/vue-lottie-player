import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "./",
  plugins: [vue()],
  resolve: {
    alias: {
      "vue-lottie-player": fileURLToPath(new URL("../../src/entry.ts", import.meta.url))
    }
  }
});
