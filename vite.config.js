import { defineConfig } from "vite";

export default defineConfig({
  root: "./src/playground", // 👈 dev server root
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
