import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "src") },
      { find: "@pages", replacement: resolve(__dirname, "src/pages") },
      { find: "@features", replacement: resolve(__dirname, "src/features") },
      { find: "@routes", replacement: resolve(__dirname, "src/routes") },
      { find: "@shared", replacement: resolve(__dirname, "src/shared") },
      { find: "@styles", replacement: resolve(__dirname, "src/styles") },
      { find: "@store", replacement: resolve(__dirname, "src/store") },
    ],
  },
});