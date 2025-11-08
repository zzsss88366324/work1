// 联系页面 - 联系表单
import { useState } from 'react';
import { submitContact } from '../services/api';
import '../styles/Contact.css';

/**
 * Contact 组件
 * 显示联系表单,允许访客发送消息
 */
const Contact = () => {
  // 表单状态
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // UI 状态
  const [loading, setLoading] = useState(false); // 提交状态
  const [error, setError] = useState(null); // 错误信息
  const [success, setSuccess] = useState(false); // 成功状态

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
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('请填写所有必填字段');
      return;
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('请输入有效的邮箱地址');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // 提交表单数据
      await submitContact(formData);

      // 提交成功
      setSuccess(true);

      // 重置表单
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      // 5秒后隐藏成功消息
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      // 处理错误
      setError(err.message || '发送消息失败,请稍后重试');
      console.error('提交联系表单错误:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1 className="page-title">联系我</h1>
        <p className="page-subtitle">
          有问题或想要合作?欢迎给我留言,我会尽快回复你!
        </p>

        <div className="contact-content">
          {/* 联系表单 */}
          <form onSubmit={handleSubmit} className="contact-form">
            {/* 姓名 */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                姓名 <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="请输入你的姓名"
                disabled={loading}
                required
              />
            </div>

            {/* 邮箱 */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                邮箱 <span className="required">*</span>
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

            {/* 主题 */}
            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                主题
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="消息主题 (可选)"
                disabled={loading}
              />
            </div>

            {/* 消息 */}
            <div className="form-group">
              <label htmlFor="message" className="form-label">
                消息 <span className="required">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="请输入你的消息..."
                rows="6"
                disabled={loading}
                required
              />
            </div>

            {/* 错误和成功消息 */}
            {error && <div className="error">{error}</div>}
            {success && (
              <div className="success">
                消息发送成功!我会尽快回复你。
              </div>
            )}

            {/* 提交按钮 */}
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? '发送中...' : '发送消息'}
            </button>
          </form>

          {/* 联系信息 */}
          <div className="contact-info">
            <h2>其他联系方式</h2>

            <div className="info-item">
              <h3>邮箱</h3>
              <p>your.email@example.com</p>
            </div>

            <div className="info-item">
              <h3>社交媒体</h3>
              <div className="social-links">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </div>
            </div>

            <div className="info-item">
              <h3>位置</h3>
              <p>中国,北京</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
