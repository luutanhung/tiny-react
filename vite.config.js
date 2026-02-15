import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.js",
      name: "TinyReact",
      fileName: "tiny-react",
    },
    rollupOptions: {
      external: ["tests"],
    },
  },
});
