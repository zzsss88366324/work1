# 部署指南

本指南将帮助你将 React 前端应用部署到生产环境。

## 📋 部署前检查清单

- [ ] 后端 API 已部署并可访问
- [ ] 获取后端 API 的完整 URL (例如: https://your-api.com/api)
- [ ] 所有功能在本地测试通过
- [ ] 代码已提交到 Git 仓库

## 🚀 方式 1: 部署到 Vercel (推荐)

Vercel 是部署 React 应用的最佳平台之一,提供自动部署和免费计划。

### 步骤 1: 注册 Vercel

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账号登录

### 步骤 2: 导入项目

1. 点击 "Add New Project"
2. 选择你的 GitHub 仓库
3. Vercel 会自动检测到这是一个 Vite 项目

### 步骤 3: 配置环境变量

在部署设置中,添加环境变量:

- **变量名**: `VITE_API_URL`
- **值**: 你的后端 API URL (例如: `https://your-backend-api.onrender.com/api`)

### 步骤 4: 部署

1. 点击 "Deploy"
2. 等待构建完成
3. 获取部署 URL

### 使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel

# 设置环境变量
vercel env add VITE_API_URL

# 重新部署以应用环境变量
vercel --prod
```

## 🌐 方式 2: 部署到 Netlify

### 步骤 1: 注册 Netlify

1. 访问 [Netlify](https://netlify.com)
2. 使用 GitHub 账号登录

### 步骤 2: 部署

**方式 A: 从 GitHub (推荐)**

1. 点击 "Add new site" → "Import an existing project"
2. 选择 GitHub,授权并选择你的仓库
3. 构建设置:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. 添加环境变量:
   - Key: `VITE_API_URL`
   - Value: 你的后端 API URL
5. 点击 "Deploy site"

**方式 B: 使用 Netlify CLI**

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 构建项目
npm run build

# 部署
netlify deploy --prod

# 当提示时,选择 dist 作为发布目录
```

### 步骤 3: 配置环境变量

1. 进入站点设置
2. 找到 "Environment variables"
3. 添加 `VITE_API_URL`

### 步骤 4: 重新部署

环境变量更改后需要重新部署。

## 📦 方式 3: 手动部署到任意静态主机

### 步骤 1: 设置环境变量

创建 `.env.production` 文件:

```env
VITE_API_URL=https://your-backend-api.com/api
```

### 步骤 2: 构建

```bash
npm run build
```

这会在 `dist` 目录创建生产版本。

### 步骤 3: 上传到主机

将 `dist` 目录中的所有文件上传到你的静态主机:

- **GitHub Pages**: 推送到 `gh-pages` 分支
- **AWS S3**: 上传到 S3 bucket
- **传统主机**: 通过 FTP 上传

## 🔧 构建配置优化

### Vite 生产优化

在 `vite.config.js` 中:

```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false, // 生产环境禁用源映射
    minify: 'terser', // 使用 terser 压缩
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
```

## 🌍 配置自定义域名

### Vercel

1. 进入项目设置
2. 点击 "Domains"
3. 添加你的自定义域名
4. 按照指引配置 DNS

### Netlify

1. 进入站点设置
2. 点击 "Domain management"
3. 添加自定义域名
4. 配置 DNS 记录

## 🔒 HTTPS 配置

Vercel 和 Netlify 都自动提供免费的 SSL 证书,你的网站会自动使用 HTTPS。

## 🐛 常见部署问题

### 问题 1: 环境变量未生效

**解决方案**:
- 确保环境变量名以 `VITE_` 开头
- 部署平台的环境变量更改后需要重新部署
- 检查环境变量值中是否有多余的空格或引号

### 问题 2: 404 错误 (路由不工作)

**解决方案**:

**Vercel**: 创建 `vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Netlify**: 创建 `public/_redirects`:
```
/*    /index.html   200
```

### 问题 3: API 请求失败 (CORS 错误)

**解决方案**:
- 确保后端 API 配置了正确的 CORS 策略
- 允许你的前端域名访问 API
- 检查 API URL 是否正确

### 问题 4: 构建失败

**解决方案**:
```bash
# 清除缓存和重新安装
rm -rf node_modules package-lock.json
npm install

# 本地测试构建
npm run build

# 检查是否有 TypeScript 或 ESLint 错误
```

### 问题 5: 样式丢失

**解决方案**:
- 确保所有 CSS 文件都正确导入
- 检查 CSS 文件路径是否正确
- 验证 `index.html` 中的资源路径

## 📊 监控和分析

### Vercel Analytics

Vercel 自动提供基本分析。升级到 Pro 计划可获得更多功能。

### Google Analytics

在 `index.html` 中添加:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔄 自动部署

### GitHub Actions 工作流

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## ✅ 部署后检查

部署完成后,测试以下功能:

- [ ] 所有页面都可以访问
- [ ] 刷新页面不会出现 404 错误
- [ ] 可以成功登录/注册
- [ ] API 请求正常工作
- [ ] 图片和样式正确加载
- [ ] 移动端显示正常
- [ ] HTTPS 正常工作

## 📝 提交作业

记录以下信息提交给老师:

1. **前端部署 URL**: `https://your-frontend.vercel.app`
2. **后端 API URL**: `https://your-backend-api.onrender.com/api`
3. **GitHub 仓库**: `https://github.com/yourusername/portfolio-spa`
4. **测试账号** (如果需要):
   - Email: test@example.com
   - Password: test123

## 🎉 完成!

恭喜! 你的全栈作品集网站已成功部署!

如有问题,请查看:
- [Vercel 文档](https://vercel.com/docs)
- [Netlify 文档](https://docs.netlify.com)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
