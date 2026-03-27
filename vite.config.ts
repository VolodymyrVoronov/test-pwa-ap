import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: process.env.NODE_ENV === "development" ? "/" : "/test-pwa-ap/",
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "Audio App",
        short_name: "AudioApp",
        description: "Audio player / DAW",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        start_url: "/",

        icons: [
          {
            src: "/favicon.svg",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicon.svg",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/favicon.svg",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,mp3,wav}"],
      },

      devOptions: {
        enabled: true,
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});