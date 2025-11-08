// 页头组件 - 导航栏
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

/**
 * Header 组件
 * 显示导航栏,根据用户认证状态显示不同的导航链接
 */
const Header = () => {
  // 从认证上下文获取用户信息和登出函数
  const { user, logout, isAuthenticated } = useAuth();

  /**
   * 处理登出按钮点击事件
   */
  const handleLogout = () => {
    // 调用登出函数
    logout();
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          {/* Logo / 网站名称 */}
          <div className="logo">
            <Link to="/">我的作品集</Link>
          </div>

          {/* 导航链接 */}
          <ul className="nav-links">
            {/* 公共导航链接 */}
            <li>
              <Link to="/">首页</Link>
            </li>
            <li>
              <Link to="/projects">项目</Link>
            </li>
            <li>
              <Link to="/blog">博客</Link>
            </li>
            <li>
              <Link to="/contact">联系我</Link>
            </li>

            {/* 根据认证状态显示不同的链接 */}
            {isAuthenticated() ? (
              // 已登录状态: 显示管理员仪表板和登出按钮
              <>
                <li>
                  <Link to="/admin" className="admin-link">
                    管理后台
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    登出 ({user?.username})
                  </button>
                </li>
              </>
            ) : (
              // 未登录状态: 显示登录和注册链接
              <>
                <li>
                  <Link to="/login">登录</Link>
                </li>
                <li>
                  <Link to="/register" className="register-link">
                    注册
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
