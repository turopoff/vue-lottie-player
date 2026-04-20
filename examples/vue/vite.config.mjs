import { readFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const packageJson = JSON.parse(
  readFileSync(new URL("../../package.json", import.meta.url), "utf8")
);
const repositoryUrl = packageJson.repository?.url ?? "";
const repositoryName = repositoryUrl.match(
  /github\.com[:/][^/]+\/([^/.]+)(?:\.git)?$/
)?.[1];

const getGithubPagesBase = (mode) => {
  if (mode !== "github-pages") {
    return "./";
  }

  if (!repositoryName || repositoryName.endsWith(".github.io")) {
    return "/";
  }

  return `/${repositoryName}/`;
};

export default defineConfig(({ mode }) => ({
  base: getGithubPagesBase(mode),
  plugins: [vue()],
  resolve: {
    alias: {
      "vue-lottie-player": fileURLToPath(new URL("../../src/entry.ts", import.meta.url))
    }
  }
}));
