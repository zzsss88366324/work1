// 页脚组件
import '../styles/Footer.css';

/**
 * Footer 组件
 * 显示网站页脚信息
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* 版权信息 */}
          <p className="copyright">
            &copy; {currentYear} 我的作品集. 保留所有权利.
          </p>

          {/* 社交媒体链接 (示例) */}
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
      </div>
    </footer>
  );
};

export default Footer;
