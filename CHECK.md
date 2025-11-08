# ✅ 项目测试检查清单

## 🎯 构建测试

✅ **构建成功!**

```
✓ 63 modules transformed.
✓ built in 729ms

输出文件:
- dist/index.html (0.59 kB)
- dist/assets/index-D4cOjaD5.css (16.83 kB)
- dist/assets/index-Bxg9zqi_.js (254.02 kB)
```

## 📋 快速测试步骤

### 1. 测试开发服务器

```bash
npm run dev
```

然后在浏览器访问 http://localhost:3000

**期望结果**:
- ✅ 页面正常加载
- ✅ 可以看到首页内容
- ✅ 导航栏显示正常
- ✅ 可以点击导航链接切换页面

### 2. 测试 API 连接

**前提**: 确保后端 API 服务器正在运行

#### 测试方法 A: 使用浏览器

1. 启动开发服务器: `npm run dev`
2. 访问 http://localhost:3000/projects
3. 打开浏览器开发者工具 (F12) → Network 标签
4. 查看是否有 API 请求

**期望结果**:
- ✅ 看到对 `/api/projects` 的请求
- ✅ 请求状态码为 200
- ✅ 页面显示项目数据

**如果看到 CORS 错误**:
- 后端需要配置 CORS 允许前端域名

**如果看到 404 错误**:
- 检查 .env 中的 VITE_API_URL 是否正确
- 确认后端 API 端点存在

#### 测试方法 B: 使用 curl

```bash
# 测试后端 API 是否运行
curl http://localhost:5000/api/projects

# 如果返回 JSON 数据,说明 API 正常
```

### 3. 测试所有页面

访问以下 URL,确保都能正常显示:

- ✅ http://localhost:3000/ (首页)
- ✅ http://localhost:3000/projects (项目页)
- ✅ http://localhost:3000/blog (博客页)
- ✅ http://localhost:3000/contact (联系页)
- ✅ http://localhost:3000/login (登录页)
- ✅ http://localhost:3000/register (注册页)

### 4. 测试受保护路由

1. 访问 http://localhost:3000/admin (未登录)
   - **期望**: 自动重定向到 /login

2. 在登录页输入凭据并登录
   - **期望**: 成功后重定向到 /admin

3. 在管理后台测试 CRUD 操作
   - **期望**: 可以创建、编辑、删除项目和博客

### 5. 测试表单

#### 联系表单 (/contact)
1. 填写所有字段
2. 点击提交
3. **期望**: 显示成功消息

#### 登录表单 (/login)
1. 输入邮箱和密码
2. 点击登录
3. **期望**: 成功后跳转到 /admin

#### 注册表单 (/register)
1. 填写所有字段
2. 点击注册
3. **期望**: 创建账户并自动登录

### 6. 测试评论功能

1. 访问任意博客文章详情页
2. 滚动到评论区
3. 登录后可以发表评论
4. **期望**: 评论成功提交并显示

## 🐛 常见问题排查

### 问题 1: 页面空白

**可能原因**:
- JavaScript 错误
- React 组件渲染错误

**解决方法**:
```bash
# 查看浏览器控制台错误
# 打开 F12 → Console 标签
```

### 问题 2: API 请求失败

**可能原因**:
- 后端未运行
- CORS 配置错误
- API URL 配置错误

**解决方法**:
```bash
# 1. 检查 .env 文件
cat .env

# 2. 测试后端 API
curl http://localhost:5000/api/projects

# 3. 检查后端 CORS 配置
```

### 问题 3: 样式不显示

**可能原因**:
- CSS 导入路径错误
- Vite 未正确处理 CSS

**解决方法**:
```bash
# 重新构建
npm run build
```

### 问题 4: 路由不工作

**可能原因**:
- React Router 配置错误
- 浏览器不支持 HTML5 History API

**解决方法**:
- 检查 App.jsx 中的路由配置
- 使用最新版浏览器

## 📊 测试报告模板

完成测试后,填写以下报告:

```
日期: ___________
测试人: ___________

✅ 通过的测试:
□ 构建成功
□ 开发服务器运行正常
□ 所有页面可访问
□ API 连接正常
□ 认证流程工作
□ 表单提交成功
□ 管理后台 CRUD 正常
□ 响应式设计正常

❌ 失败的测试:
□ ___________________
□ ___________________

📝 备注:
___________________
___________________
```

## 🚀 下一步

如果所有测试通过:
1. ✅ 提交代码到 Git
2. ✅ 部署到 Vercel 或 Netlify
3. ✅ 配置生产环境变量
4. ✅ 测试部署后的应用

## 💡 提示

- 始终先启动后端 API 服务器
- 使用浏览器开发者工具调试
- 查看 Network 标签了解 API 请求
- 查看 Console 标签查看错误信息
- 刷新页面时按 Cmd+Shift+R (Mac) 或 Ctrl+Shift+R (Windows) 清除缓存
