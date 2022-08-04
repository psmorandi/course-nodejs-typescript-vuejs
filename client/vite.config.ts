/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [vue()],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
});
