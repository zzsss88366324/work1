# 全栈作品集网站 - 前端应用

这是一个使用 React 构建的全栈个人作品集网站的前端应用。该项目是 Web Programming 课程的 Capstone 项目,展示了现代 Web 开发的最佳实践。

## 🌟 项目特性

### 核心功能

- ✅ **组件化架构**: 使用可复用的 React 组件构建
- ✅ **响应式设计**: 适配所有设备尺寸
- ✅ **客户端路由**: 使用 React Router 实现多页面体验
- ✅ **全局状态管理**: 使用 Context API 管理认证状态
- ✅ **完整的认证流程**: 注册、登录、登出功能
- ✅ **受保护的路由**: 管理员仪表板需要认证访问
- ✅ **API 集成**: 与后端 API 完全集成

### 页面功能

#### 公共页面
- **首页 (/)**: 个人简介和技能展示
- **项目页面 (/projects)**: 展示所有项目,从 API 获取数据
- **博客页面 (/blog)**: 显示所有博客文章列表
- **博客详情 (/blog/:id)**: 显示单篇文章和评论功能
- **联系页面 (/contact)**: 联系表单,提交到后端 API
- **登录页面 (/login)**: 用户登录
- **注册页面 (/register)**: 用户注册

#### 受保护页面
- **管理员仪表板 (/admin)**:
  - 管理项目 (创建、更新、删除)
  - 管理博客文章 (创建、更新、删除)
  - 需要 JWT 认证

## 🚀 技术栈

- **React 19**: 用于构建用户界面
- **React Router 7**: 客户端路由
- **Vite**: 构建工具和开发服务器
- **Context API**: 全局状态管理
- **CSS Modules**: 样式管理
- **Fetch API**: HTTP 请求

## 📋 前置要求

在运行此项目之前,请确保你已经安装:

- Node.js (v16 或更高版本)
- npm (v7 或更高版本)
- 后端 API 服务器正在运行

## 🛠️ 安装步骤

### 1. 克隆仓库

```bash
git clone <你的仓库地址>
cd portfolio-spa
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 文件为 `.env`:

```bash
cp .env.example .env
```

编辑 `.env` 文件,设置你的后端 API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

**注意**: 请将 `http://localhost:5000/api` 替换为你的实际后端 API 地址。

### 4. 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 运行。

## 📦 构建生产版本

要构建用于部署的生产版本:

```bash
npm run build
```

构建后的文件将在 `dist` 目录中。

预览生产构建:

```bash
npm run preview
```

## 🌐 部署

### 部署到 Vercel

1. 安装 Vercel CLI (如果还没安装):
   ```bash
   npm install -g vercel
   ```

2. 登录 Vercel:
   ```bash
   vercel login
   ```

3. 部署:
   ```bash
   vercel
   ```

4. 设置环境变量:
   - 在 Vercel 项目设置中添加 `VITE_API_URL` 环境变量
   - 值为你部署的后端 API URL

### 部署到 Netlify

1. 安装 Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. 构建项目:
   ```bash
   npm run build
   ```

3. 部署:
   ```bash
   netlify deploy --prod
   ```

4. 在 Netlify 网站设置中配置环境变量 `VITE_API_URL`

## 📁 项目结构

```
portfolio-spa/
├── src/
│   ├── components/          # 可复用组件
│   │   ├── Header.jsx       # 页头导航组件
│   │   ├── Footer.jsx       # 页脚组件
│   │   └── ProtectedRoute.jsx  # 路由保护组件
│   ├── pages/              # 页面组件
│   │   ├── Home.jsx        # 首页
│   │   ├── Projects.jsx    # 项目页面
│   │   ├── Blog.jsx        # 博客列表页面
│   │   ├── BlogDetail.jsx  # 博客详情页面
│   │   ├── Contact.jsx     # 联系页面
│   │   ├── Login.jsx       # 登录页面
│   │   ├── Register.jsx    # 注册页面
│   │   └── AdminDashboard.jsx  # 管理员仪表板
│   ├── context/            # React Context
│   │   └── AuthContext.jsx # 认证上下文
│   ├── services/           # API 服务
│   │   └── api.js          # API 请求封装
│   ├── styles/             # CSS 样式文件
│   │   ├── index.css       # 全局样式
│   │   ├── Header.css      # 页头样式
│   │   ├── Footer.css      # 页脚样式
│   │   ├── Home.css        # 首页样式
│   │   ├── Projects.css    # 项目页面样式
│   │   ├── Blog.css        # 博客页面样式
│   │   ├── BlogDetail.css  # 博客详情样式
│   │   ├── Contact.css     # 联系页面样式
│   │   ├── Auth.css        # 认证页面样式
│   │   └── AdminDashboard.css  # 仪表板样式
│   ├── App.jsx             # 主应用组件
│   └── main.jsx            # 入口文件
├── public/                 # 静态资源
├── index.html              # HTML 模板
├── vite.config.js          # Vite 配置
├── package.json            # 项目依赖
├── .env.example            # 环境变量示例
└── README.md               # 项目文档
```

## 🔑 主要组件说明

### AuthContext (认证上下文)

管理全局认证状态,提供以下功能:
- `login(email, password)`: 用户登录
- `register(userData)`: 用户注册
- `logout()`: 用户登出
- `isAuthenticated()`: 检查是否已认证
- `user`: 当前用户信息
- `token`: JWT 认证令牌

### API 服务

所有 API 请求都通过 `src/services/api.js` 集中管理:

#### 项目相关
- `getProjects()`: 获取所有项目
- `getProject(id)`: 获取单个项目
- `createProject(data)`: 创建项目 (需认证)
- `updateProject(id, data)`: 更新项目 (需认证)
- `deleteProject(id)`: 删除项目 (需认证)

#### 博客相关
- `getBlogPosts()`: 获取所有博客文章
- `getBlogPost(id)`: 获取单篇文章
- `createBlogPost(data)`: 创建文章 (需认证)
- `updateBlogPost(id, data)`: 更新文章 (需认证)
- `deleteBlogPost(id)`: 删除文章 (需认证)
- `addComment(postId, data)`: 添加评论

#### 其他
- `submitContact(data)`: 提交联系表单
- `login(credentials)`: 用户登录
- `register(userData)`: 用户注册

### 路由配置

所有路由在 `App.jsx` 中配置:

```jsx
/ - 首页
/projects - 项目页面
/blog - 博客列表
/blog/:id - 博客详情
/contact - 联系页面
/login - 登录
/register - 注册
/admin - 管理员仪表板 (受保护)
```

## 🔒 认证流程

1. **注册**: 用户在 `/register` 填写表单 → 调用 `register()` API → 保存 token 到 localStorage → 重定向到 `/admin`

2. **登录**: 用户在 `/login` 填写表单 → 调用 `login()` API → 保存 token 到 localStorage → 重定向到 `/admin`

3. **访问受保护路由**: 访问 `/admin` → `ProtectedRoute` 检查认证状态 → 如果未认证则重定向到 `/login`

4. **登出**: 点击登出按钮 → 调用 `logout()` → 清除 localStorage → 更新全局状态

## 🎨 样式说明

项目使用纯 CSS 实现样式,主要特性:

- **CSS 变量**: 使用 CSS 变量管理颜色主题
- **响应式设计**: 使用媒体查询适配不同屏幕
- **深色主题**: 默认使用深色主题
- **动画和过渡**: 平滑的交互效果

## 🧪 测试建议

1. **公共页面测试**:
   - 访问所有公共页面,确保数据正确显示
   - 测试联系表单提交
   - 测试博客评论功能 (需登录)

2. **认证测试**:
   - 注册新用户
   - 使用新用户登录
   - 验证认证状态持久化 (刷新页面后仍保持登录)
   - 测试登出功能

3. **管理员功能测试**:
   - 未登录时访问 `/admin` 应重定向到登录页面
   - 登录后测试创建、更新、删除项目
   - 登录后测试创建、更新、删除博客文章

4. **响应式测试**:
   - 在不同屏幕尺寸下测试布局
   - 测试移动端导航

## 🔗 相关链接

- **前端部署地址**: [待填写]
- **后端 API 地址**: [待填写]
- **GitHub 仓库**: [待填写]

## 📝 开发注意事项

1. **环境变量**: 确保 `.env` 文件中的 `VITE_API_URL` 正确配置
2. **CORS**: 确保后端 API 配置了正确的 CORS 策略
3. **认证令牌**: JWT token 存储在 localStorage,在生产环境建议使用更安全的方式
4. **错误处理**: 所有 API 请求都有错误处理,会显示用户友好的错误消息

## 🤝 贡献

欢迎提交 Pull Request 或报告 Issue。

## 📄 许可证

ISC License

## 👨‍💻 作者

[你的名字]

---

**Capstone Project** - Web Programming: Building the Modern User Interface
