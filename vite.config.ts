import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/goe/",
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "goe-trailing-slash-redirect",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/goe") {
            res.statusCode = 308;
            res.setHeader("Location", "/goe/");
            res.end();
            return;
          }
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/goe") {
            res.statusCode = 308;
            res.setHeader("Location", "/goe/");
            res.end();
            return;
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
