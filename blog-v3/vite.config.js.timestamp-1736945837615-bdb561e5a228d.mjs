// vite.config.js
import { defineConfig } from "file:///D:/projectDoc/webBlog/blog-v3/node_modules/.pnpm/vite@4.5.3_@types+node@22.0.0_sass@1.77.8/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/projectDoc/webBlog/blog-v3/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vite@4.5.3_@types+node@22.0.0_sass@1.77.8__vue@3.4.34_typescript@5.5.4_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import commonjs from "file:///D:/projectDoc/webBlog/blog-v3/node_modules/.pnpm/@rollup+plugin-commonjs@25.0.8_rollup@3.29.4/node_modules/@rollup/plugin-commonjs/dist/es/index.js";
import AutoImport from "file:///D:/projectDoc/webBlog/blog-v3/node_modules/.pnpm/unplugin-auto-import@0.11.5_@vueuse+core@9.13.0_vue@3.4.34_typescript@5.5.4___rollup@3.29.4/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/projectDoc/webBlog/blog-v3/node_modules/.pnpm/unplugin-vue-components@0.22.12_@babel+parser@7.26.3_rollup@3.29.4_vue@3.4.34_typescript@5.5.4_/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///D:/projectDoc/webBlog/blog-v3/node_modules/.pnpm/unplugin-vue-components@0.22.12_@babel+parser@7.26.3_rollup@3.29.4_vue@3.4.34_typescript@5.5.4_/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import viteCompression from "file:///D:/projectDoc/webBlog/blog-v3/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@4.5.3_@types+node@22.0.0_sass@1.77.8_/node_modules/vite-plugin-compression/dist/index.mjs";
import { resolve } from "path";
import requireTransform from "file:///D:/projectDoc/webBlog/blog-v3/node_modules/.pnpm/vite-plugin-require-transform@1.0.21/node_modules/vite-plugin-require-transform/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///D:/projectDoc/webBlog/blog-v3/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.5.3_@types+node@22.0.0_sass@1.77.8_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import Inspector from "file:///D:/projectDoc/webBlog/blog-v3/node_modules/.pnpm/unplugin-vue-inspector@2.3.1_vite@4.5.3_@types+node@22.0.0_sass@1.77.8_/node_modules/unplugin-vue-inspector/dist/vite.mjs";
var __vite_injected_original_dirname = "D:\\projectDoc\\webBlog\\blog-v3";
var vite_config_default = defineConfig({
  base: "./",
  root: process.cwd(),
  // 绝对路径
  resolve: {
    // 配置路径别名
    alias: [
      // 配置 @ 指代 src
      {
        find: "@",
        replacement: resolve(__vite_injected_original_dirname, "./src")
      }
    ],
    extensions: [".js", ".vue", ".json"]
  },
  assetsInclude: ["**/*.cur"],
  // 按需导入element-plus main.js里不需要再引入了
  plugins: [
    vue(),
    Inspector(),
    commonjs(),
    // 自动导入element plus组件
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dts: true,
      dirs: "src/components",
      resolvers: [ElementPlusResolver()]
      // ElementPlus按需加载
    }),
    viteCompression({
      verbose: true,
      // 默认即可
      disable: false,
      //开启压缩(不禁用)，默认即可
      deleteOriginFile: false,
      //删除源文件
      threshold: 10240,
      //压缩前最小文件大小
      algorithm: "gzip",
      //压缩算法
      ext: ".gz"
      //文件类型
    }),
    // 让vite支持require
    requireTransform({
      fileRegex: /.js$|.vue$/
    }),
    // svg
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [resolve(process.cwd(), "src/icons/svg")]
    })
  ],
  css: {
    preprocessorOptions: {
      // 引入全局scss
      scss: {
        additionalData: `@import "./src/styles/base.scss";`
      }
    }
  },
  server: {
    port: 8080,
    host: "0.0.0.0",
    https: false,
    open: true,
    // 热更新
    hmr: {
      overlay: false
    },
    proxy: {
      // 本地后端代理
      "/api": {
        //要访问的跨域的域名
        target: "http://localhost:8888",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      },
      // minio 代理
      "/blog-images": {
        target: "http://www.hakugyokurou.fun:9000/blog-images",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/blog-images/, "")
      },
      "/wapi": {
        // 网易云的音乐代理
        target: "http://8.137.51.98:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wapi/, "")
      }
    }
  },
  // 打包输出
  build: {
    sourcemap: false,
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 4e3,
    rollupOptions: {
      input: {
        index: resolve("index.html")
      },
      // 静态资源分类打包
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0RG9jXFxcXHdlYkJsb2dcXFxcYmxvZy12M1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccHJvamVjdERvY1xcXFx3ZWJCbG9nXFxcXGJsb2ctdjNcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Byb2plY3REb2Mvd2ViQmxvZy9ibG9nLXYzL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IGNvbW1vbmpzIGZyb20gXCJAcm9sbHVwL3BsdWdpbi1jb21tb25qc1wiOyAvLyBcdThCQTl2aXRlXHU2MjUzXHU1MzA1XHU2NTJGXHU2MzAxY29tbW9uLmpzXHU4QkVEXHU2Q0Q1XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tIFwidW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZVwiOyAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTdFQzRcdTRFRjZcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCI7IC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NXNyYy9jb21wb25lbnRzXHU0RTBCXHU3Njg0XHU3RUM0XHU0RUY2XG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVyc1wiOyAvLyBcdTYzMDlcdTk3MDBcdTVCRkNcdTUxNjVlcFxuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb25cIjsgLy8gZ3ppcFx1NTM4Qlx1N0YyOVxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgcmVxdWlyZVRyYW5zZm9ybSBmcm9tIFwidml0ZS1wbHVnaW4tcmVxdWlyZS10cmFuc2Zvcm1cIjsgLy8gXHU2NTJGXHU2MzAxcmVxdWlyZVxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnLWljb25zXCI7IC8vIFx1NjUyRlx1NjMwMXN2Z1xuaW1wb3J0IEluc3BlY3RvciBmcm9tICd1bnBsdWdpbi12dWUtaW5zcGVjdG9yL3ZpdGUnXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTogXCIuL1wiLFxuICByb290OiBwcm9jZXNzLmN3ZCgpLCAvLyBcdTdFRERcdTVCRjlcdThERUZcdTVGODRcbiAgcmVzb2x2ZToge1xuICAgIC8vIFx1OTE0RFx1N0Y2RVx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgIGFsaWFzOiBbXG4gICAgICAvLyBcdTkxNERcdTdGNkUgQCBcdTYzMDdcdTRFRTMgc3JjXG4gICAgICB7XG4gICAgICAgIGZpbmQ6IFwiQFwiLFxuICAgICAgICByZXBsYWNlbWVudDogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgICB9LFxuICAgIF0sXG4gICAgZXh0ZW5zaW9uczogW1wiLmpzXCIsIFwiLnZ1ZVwiLCBcIi5qc29uXCJdLFxuICB9LFxuICBhc3NldHNJbmNsdWRlOiBbXCIqKi8qLmN1clwiXSxcblxuICAvLyBcdTYzMDlcdTk3MDBcdTVCRkNcdTUxNjVlbGVtZW50LXBsdXMgbWFpbi5qc1x1OTFDQ1x1NEUwRFx1OTcwMFx1ODk4MVx1NTE4RFx1NUYxNVx1NTE2NVx1NEU4NlxuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgSW5zcGVjdG9yKCksXG4gICAgY29tbW9uanMoKSxcbiAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVlbGVtZW50IHBsdXNcdTdFQzRcdTRFRjZcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICBkdHM6IHRydWUsXG4gICAgICBkaXJzOiBcInNyYy9jb21wb25lbnRzXCIsXG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLCAvLyBFbGVtZW50UGx1c1x1NjMwOVx1OTcwMFx1NTJBMFx1OEY3RFxuICAgIH0pLFxuICAgIHZpdGVDb21wcmVzc2lvbih7XG4gICAgICB2ZXJib3NlOiB0cnVlLCAvLyBcdTlFRDhcdThCQTRcdTUzNzNcdTUzRUZcbiAgICAgIGRpc2FibGU6IGZhbHNlLCAvL1x1NUYwMFx1NTQyRlx1NTM4Qlx1N0YyOShcdTRFMERcdTc5ODFcdTc1MjgpXHVGRjBDXHU5RUQ4XHU4QkE0XHU1MzczXHU1M0VGXG4gICAgICBkZWxldGVPcmlnaW5GaWxlOiBmYWxzZSwgLy9cdTUyMjBcdTk2NjRcdTZFOTBcdTY1ODdcdTRFRjZcbiAgICAgIHRocmVzaG9sZDogMTAyNDAsIC8vXHU1MzhCXHU3RjI5XHU1MjREXHU2NzAwXHU1QzBGXHU2NTg3XHU0RUY2XHU1OTI3XHU1QzBGXG4gICAgICBhbGdvcml0aG06IFwiZ3ppcFwiLCAvL1x1NTM4Qlx1N0YyOVx1N0I5N1x1NkNENVxuICAgICAgZXh0OiBcIi5nelwiLCAvL1x1NjU4N1x1NEVGNlx1N0M3Qlx1NTc4QlxuICAgIH0pLFxuICAgIC8vIFx1OEJBOXZpdGVcdTY1MkZcdTYzMDFyZXF1aXJlXG4gICAgcmVxdWlyZVRyYW5zZm9ybSh7XG4gICAgICBmaWxlUmVnZXg6IC8uanMkfC52dWUkLyxcbiAgICB9KSxcbiAgICAvLyBzdmdcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICAvLyBTcGVjaWZ5IHRoZSBpY29uIGZvbGRlciB0byBiZSBjYWNoZWRcbiAgICAgIGljb25EaXJzOiBbcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcInNyYy9pY29ucy9zdmdcIildLFxuICAgIH0pLFxuICBdLFxuICBjc3M6IHtcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAvLyBcdTVGMTVcdTUxNjVcdTUxNjhcdTVDNDBzY3NzXG4gICAgICBzY3NzOiB7XG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCBcIi4vc3JjL3N0eWxlcy9iYXNlLnNjc3NcIjtgLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA4MDgwLFxuICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxuICAgIGh0dHBzOiBmYWxzZSxcbiAgICBvcGVuOiB0cnVlLFxuICAgIC8vIFx1NzBFRFx1NjZGNFx1NjVCMFxuICAgIGhtcjoge1xuICAgICAgb3ZlcmxheTogZmFsc2UsXG4gICAgfSxcbiAgICBwcm94eToge1xuICAgICAgLy8gXHU2NzJDXHU1NzMwXHU1NDBFXHU3QUVGXHU0RUUzXHU3NDA2XG4gICAgICBcIi9hcGlcIjoge1xuICAgICAgICAvL1x1ODk4MVx1OEJCRlx1OTVFRVx1NzY4NFx1OERFOFx1NTdERlx1NzY4NFx1NTdERlx1NTQwRFxuICAgICAgICB0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDo4ODg4XCIsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sIFwiXCIpLFxuICAgICAgfSxcbiAgICAgIC8vIG1pbmlvIFx1NEVFM1x1NzQwNlxuICAgICAgXCIvYmxvZy1pbWFnZXNcIjoge1xuICAgICAgICB0YXJnZXQ6IFwiaHR0cDovL3d3dy5oYWt1Z3lva3Vyb3UuZnVuOjkwMDAvYmxvZy1pbWFnZXNcIixcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYmxvZy1pbWFnZXMvLCBcIlwiKSxcbiAgICAgIH0sXG4gICAgICBcIi93YXBpXCI6IHtcbiAgICAgICAgLy8gXHU3RjUxXHU2NjEzXHU0RTkxXHU3Njg0XHU5N0YzXHU0RTUwXHU0RUUzXHU3NDA2XG4gICAgICAgIHRhcmdldDogXCJodHRwOi8vOC4xMzcuNTEuOTg6MzAwMFwiLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC93YXBpLywgXCJcIiksXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIC8vIFx1NjI1M1x1NTMwNVx1OEY5M1x1NTFGQVxuICBidWlsZDoge1xuICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgLy8gXHU2RDg4XHU5NjY0XHU2MjUzXHU1MzA1XHU1OTI3XHU1QzBGXHU4RDg1XHU4RkM3NTAwa2JcdThCNjZcdTU0NEFcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDQwMDAsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgaW5kZXg6IHJlc29sdmUoXCJpbmRleC5odG1sXCIpLFxuICAgICAgfSxcbiAgICAgIC8vIFx1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MFx1NTIwNlx1N0M3Qlx1NjI1M1x1NTMwNVxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiBcInN0YXRpYy9qcy9bbmFtZV0tW2hhc2hdLmpzXCIsXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcInN0YXRpYy9qcy9bbmFtZV0tW2hhc2hdLmpzXCIsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiBcInN0YXRpYy9bZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVIsU0FBUyxvQkFBb0I7QUFDOVMsT0FBTyxTQUFT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
