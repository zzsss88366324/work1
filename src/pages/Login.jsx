// 登录页面
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

/**
 * Login 组件
 * 用户登录页面
 */
const Login = () => {
  const navigate = useNavigate(); // 路由导航
  const { login } = useAuth(); // 从认证上下文获取登录函数

  // 表单状态
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // UI 状态
  const [loading, setLoading] = useState(false); // 提交状态
  const [error, setError] = useState(null); // 错误信息

  /**
   * 处理表单输入变化
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * 处理表单提交
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 验证表单
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('请填写所有字段');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 调用登录函数
      await login(formData.email, formData.password);

      // 登录成功,重定向到管理后台
      navigate('/admin');
    } catch (err) {
      // 处理错误
      setError(err.message || '登录失败,请检查邮箱和密码');
      console.error('登录错误:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <h1 className="auth-title">登录</h1>
          <p className="auth-subtitle">欢迎回来!请登录你的账户</p>

          <form onSubmit={handleSubmit} className="auth-form">
            {/* 邮箱 */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                邮箱
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="请输入你的邮箱"
                disabled={loading}
                required
              />
            </div>

            {/* 密码 */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                密码
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="请输入你的密码"
                disabled={loading}
                required
              />
            </div>

            {/* 错误消息 */}
            {error && <div className="error">{error}</div>}

            {/* 提交按钮 */}
            <button type="submit" disabled={loading} className="auth-btn">
              {loading ? '登录中...' : '登录'}
            </button>
          </form>

          {/* 注册链接 */}
          <p className="auth-footer">
            还没有账户? <Link to="/register">立即注册</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
