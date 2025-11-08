# 快速入门指南

## 立即开始

### 1. 安装依赖
```bash
npm install
```

### 2. 配置环境变量
```bash
# 复制示例文件
cp .env.example .env

# 编辑 .env 文件,设置你的后端 API URL
# VITE_API_URL=http://localhost:5000/api
```

### 3. 启动开发服务器
```bash
npm run dev
```

应用将在 http://localhost:3000 打开

### 4. 开始开发!

访问以下页面测试功能:
- 首页: http://localhost:3000/
- 项目: http://localhost:3000/projects
- 博客: http://localhost:3000/blog
- 联系: http://localhost:3000/contact
- 登录: http://localhost:3000/login
- 注册: http://localhost:3000/register
- 管理后台: http://localhost:3000/admin (需要登录)

## 构建和部署

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

### 部署到 Vercel
```bash
# 安装 Vercel CLI
npm install -g vercel

# 部署
vercel

# 记得在 Vercel 项目设置中添加环境变量:
# VITE_API_URL = 你的后端 API URL
```

## 常见问题

### API 请求失败?
- 确保后端 API 服务器正在运行
- 检查 `.env` 文件中的 `VITE_API_URL` 是否正确
- 确保后端配置了正确的 CORS 策略

### 登录后刷新页面就退出了?
- 检查浏览器的 localStorage 是否被禁用
- 查看浏览器控制台是否有错误信息

### 样式没有显示?
- 确保所有 CSS 文件都已正确导入
- 检查浏览器控制台的网络请求

## 项目结构概览

```
portfolio-spa/
├── src/
│   ├── components/      # 可复用组件
│   ├── pages/          # 页面组件
│   ├── context/        # React Context
│   ├── services/       # API 服务
│   ├── styles/         # CSS 样式
│   ├── App.jsx         # 主应用组件
│   └── main.jsx        # 入口文件
├── index.html          # HTML 模板
├── vite.config.js      # Vite 配置
└── package.json        # 项目依赖
```

## 需要帮助?

查看完整文档: [README.md](./README.md)
