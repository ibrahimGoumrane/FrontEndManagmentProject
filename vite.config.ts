import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/uploads": {
        target: "http://localhost:5010", // The port where your Express server is running
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/uploads/, "/uploads"),
      },
    },
    host: "0.0.0.0", // Listen on all interfaces
    port: 5173,
  },
});
