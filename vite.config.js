// Vite 配置文件 - 用于配置开发服务器和构建选项
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 使用 React 插件以支持 JSX 和 Fast Refresh
  plugins: [react()],

  // 服务器配置
  server: {
    port: 3000, // 开发服务器端口
    open: true, // 自动打开浏览器
  },

  // 构建配置
  build: {
    outDir: 'dist', // 输出目录
    sourcemap: true, // 生成源映射文件用于调试
  },
})
