import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "./src/playground", // 👈 dev server root
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "TinyReact",
      fileName: "tiny-react",
    },
    rollupOptions: {
      external: ["tests"],
    },
  },
});
