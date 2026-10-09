import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Produce a local SPA shell for Capacitor; keep the website build unchanged.
export default defineConfig({
  nitro: false,
  tanstackStart: {
    server: { entry: "server" },
    spa: { enabled: true, prerender: { outputPath: "/index.html" } },
  },
});
