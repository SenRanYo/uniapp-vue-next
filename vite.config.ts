import path from "node:path"
import dayjs from "dayjs"
import unoCSS from "unocss/vite"
import uni from "@dcloudio/vite-plugin-uni"
import uniLayouts from "@uni-helper/vite-plugin-uni-layouts"
import uniPlatform from "@uni-helper/vite-plugin-uni-platform"
import vueSetupExtend from "vite-plugin-vue-setup-extend"
import autoImport from "unplugin-auto-import/vite"
import viteRestart from "vite-plugin-restart"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig, loadEnv } from "vite"

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const env = loadEnv(mode, path.resolve(process.cwd(), "env"))

  return defineConfig({
    envDir: "./env",
    plugins: [
      uni(),
      unoCSS(),
      uniLayouts(),
      uniPlatform(),
      vueSetupExtend(),
      autoImport({
        imports: ["vue", "uni-app"],
        dts: "src/auto-import.d.ts",
        dirs: ["src/hooks"],
        eslintrc: { enabled: false },
        vueTemplate: true,
      }),
      viteRestart({ restart: ["vite.config.js"] }),
      process.env.UNI_PLATFORM === "h5" && {
        name: "html-transform",
        transformIndexHtml(html) {
          return html.replace("%BUILD_DATE%", dayjs().format("YYYY-MM-DD HH:mm:ss"))
        },
      },
      mode === "production" &&
        visualizer({
          filename: "./node_modules/.cache/visualizer/stats.html",
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
    ],
    css: {
      postcss: {
        plugins: [],
      },
    },
    server: {
      host: "0.0.0.0",
      hmr: true,
      port: Number.parseInt(env.VITE_APP_PORT, 10),
    },
    resolve: {
      alias: {
        "@": path.join(process.cwd(), "./src"),
        "@img": path.join(process.cwd(), "./src/static/images"),
      },
    },
    build: {
      target: "es2015",
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: env.VITE_DELETE_CONSOLE === "true",
          drop_debugger: env.VITE_DELETE_CONSOLE === "true",
        },
      },
      watch:
        process.platform === "win32"
          ? {
              exclude: ["node_modules/**", "/__uno.css"],
            }
          : null,
    },
  })
}
