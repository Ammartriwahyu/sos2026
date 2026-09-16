import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "nwjabwosmhybkqaprjrg.supabase.co",
      },
      {
        protocol: "https",
        hostname: "lgnfwmfclrriaxbujeia.supabase.co",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  // Konfigurasi untuk production build
  productionBrowserSourceMaps: false,
  webpack: (config, { dev }) => {
    if (!dev) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const TerserPlugin = require("terser-webpack-plugin");

      const existingTerserPluginIndex = config.optimization.minimizer.findIndex(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (plugin: any) => plugin instanceof TerserPlugin,
      );

      const terserOptions = {
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      };

      if (existingTerserPluginIndex > -1) {
        config.optimization.minimizer[existingTerserPluginIndex] =
          new TerserPlugin(terserOptions);
      } else {
        config.optimization.minimizer.push(new TerserPlugin(terserOptions));
      }
    }

    if (dev) {
      config.plugins.push({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        apply: (compiler: any) => {
          compiler.hooks.done.tap("HideNetworkErrors", () => {
            const originalError = console.error;
            console.error = (...args) => {
              const message = args.join(" ");
              if (
                message.includes("Failed to load resource") ||
                message.includes("401") ||
                message.includes("backend.nasafacts.my.id")
              ) {
                return;
              }
              originalError.apply(console, args);
            };
          });
        },
      });
    }

    return config;
  },
};

export default nextConfig;
