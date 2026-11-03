
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/advance_mocking/",

  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",

      includeAssets: [
        "icons/icon-192.png",
        "icons/icon-512.png",
      ],

      manifest: {
        id: "/advance_mocking/",
        name: "Advance Analyzer v2.1",
        short_name: "Advance Analyzer",
        description:
          "Mock exam analytics, performance tracking, exam countdown and study playlists.",

        start_url: "/advance_mocking/",
        scope: "/advance_mocking/",

        display: "standalone",
        orientation: "any",

        theme_color: "#0b1020",
        background_color: "#0b1020",

        icons: [
          {
            src: "/advance_mocking/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/advance_mocking/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },

      workbox: {
        cleanupOutdatedCaches: true,
        navigateFallback: "index.html",

        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,webmanifest}",
        ],

        runtimeCaching: [
          {
            urlPattern: /^https:\/\/www\.googleapis\.com\//,
            handler: "NetworkFirst",
            options: {
              cacheName: "youtube-api-cache",
              expiration: {
                maxEntries: 40,
                maxAgeSeconds: 60 * 60 * 24,
              },
              networkTimeoutSeconds: 5,
            },
          },
        ],
      },

      devOptions: {
        enabled: false,
      },
    }),
  ],

  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
