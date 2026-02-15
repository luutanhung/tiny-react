import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.js",
      name: "Tiny React",
      fileName: "tiny-react",
    },
  },
});
