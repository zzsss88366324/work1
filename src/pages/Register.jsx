// 注册页面
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

/**
 * Register 组件
 * 用户注册页面
 */
const Register = () => {
  const navigate = useNavigate(); // 路由导航
  const { register } = useAuth(); // 从认证上下文获取注册函数

  // 表单状态
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('请填写所有字段');
      return;
    }

    // 验证密码长度
    if (formData.password.length < 6) {
      setError('密码长度至少为 6 位');
      return;
    }

    // 验证密码确认
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 调用注册函数
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // 注册成功,重定向到管理后台
      navigate('/admin');
    } catch (err) {
      // 处理错误
      setError(err.message || '注册失败,请稍后重试');
      console.error('注册错误:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <h1 className="auth-title">注册</h1>
          <p className="auth-subtitle">创建你的账户</p>

          <form onSubmit={handleSubmit} className="auth-form">
            {/* 用户名 */}
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                用户名
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="请输入用户名"
                disabled={loading}
                required
              />
            </div>

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
                placeholder="请输入密码 (至少 6 位)"
                disabled={loading}
                required
              />
            </div>

            {/* 确认密码 */}
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                确认密码
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="请再次输入密码"
                disabled={loading}
                required
              />
            </div>

            {/* 错误消息 */}
            {error && <div className="error">{error}</div>}

            {/* 提交按钮 */}
            <button type="submit" disabled={loading} className="auth-btn">
              {loading ? '注册中...' : '注册'}
            </button>
          </form>

          {/* 登录链接 */}
          <p className="auth-footer">
            已有账户? <Link to="/login">立即登录</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
