import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// import { analyzer } from "vite-bundle-analyzer";

// https://vite.dev/config/
export default defineConfig({
  envDir: "./src/envs",
  define: { "process.env": {} },
  plugins: [
    // analyzer(),
    vue({
      features: {
        customElement: true,
      },
      template: {},
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: "terser",
    lib: {
      formats: ["es"],
      entry: "./src/main.ts",
      name: "yanovis-payment-widget",
      fileName: "yanovis-payment-widget",
    },
  },
});
