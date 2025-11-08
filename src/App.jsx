// 主应用组件 - 配置路由
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// 导入所有页面组件
import Home from './pages/Home';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';

/**
 * App 组件
 * 应用的根组件,配置所有路由和全局上下文
 */
function App() {
  return (
    // 提供认证上下文给整个应用
    <AuthProvider>
      {/* 配置路由器 */}
      <Router>
        <div className="app">
          {/* 页头导航 - 在所有页面显示 */}
          <Header />

          {/* 主要内容区域 */}
          <main className="main-content">
            <Routes>
              {/* 公共路由 - 所有用户都可以访问 */}

              {/* 首页/关于我 */}
              <Route path="/" element={<Home />} />

              {/* 项目画廊页面 */}
              <Route path="/projects" element={<Projects />} />

              {/* 博客列表页面 */}
              <Route path="/blog" element={<Blog />} />

              {/* 博客详情页面 - 动态路由参数 :id */}
              <Route path="/blog/:id" element={<BlogDetail />} />

              {/* 联系表单页面 */}
              <Route path="/contact" element={<Contact />} />

              {/* 登录页面 */}
              <Route path="/login" element={<Login />} />

              {/* 注册页面 */}
              <Route path="/register" element={<Register />} />

              {/* 受保护的路由 - 需要用户登录才能访问 */}

              {/* 管理员仪表板 - 使用 ProtectedRoute 包装 */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* 404 页面 - 匹配所有未定义的路由 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* 页脚 - 在所有页面显示 */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

/**
 * NotFound 组件
 * 404 错误页面
 */
const NotFound = () => {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.6)' }}>
        页面未找到
      </p>
      <a href="/" style={{ color: 'var(--primary-color)', marginTop: '1rem', display: 'inline-block' }}>
        返回首页
      </a>
    </div>
  );
};

export default App;
