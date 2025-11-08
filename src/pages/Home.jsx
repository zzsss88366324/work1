// 首页 / 关于我页面
import { Link } from 'react-router-dom';
import '../styles/Home.css';

/**
 * Home 组件
 * 显示首页/关于我的个人简介
 */
const Home = () => {
  return (
    <div className="home-page">
      <div className="container">
        {/* 英雄区域 - Hero Section */}
        <section className="hero">
          <h1 className="hero-title">
            你好,我是 <span className="highlight">张三</span>
          </h1>
          <p className="hero-subtitle">全栈开发工程师 | Web 开发专家</p>
          <p className="hero-description">
            我热衷于构建优雅、高效的 Web 应用程序。
            专注于现代化的前端技术和可扩展的后端架构。
          </p>

          {/* 行动按钮 */}
          <div className="hero-actions">
            <Link to="/projects" className="btn btn-primary">
              查看我的项目
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              联系我
            </Link>
          </div>
        </section>

        {/* 技能区域 */}
        <section className="skills">
          <h2 className="section-title">技能专长</h2>
          <div className="skills-grid">
            {/* 前端技能 */}
            <div className="skill-card">
              <h3>前端开发</h3>
              <ul>
                <li>React.js / Next.js</li>
                <li>JavaScript / TypeScript</li>
                <li>HTML5 / CSS3</li>
                <li>Responsive Design</li>
              </ul>
            </div>

            {/* 后端技能 */}
            <div className="skill-card">
              <h3>后端开发</h3>
              <ul>
                <li>Node.js / Express</li>
                <li>RESTful API</li>
                <li>MongoDB / PostgreSQL</li>
                <li>Authentication & Security</li>
              </ul>
            </div>

            {/* 工具和其他 */}
            <div className="skill-card">
              <h3>工具 & 其他</h3>
              <ul>
                <li>Git / GitHub</li>
                <li>Docker</li>
                <li>CI/CD</li>
                <li>Agile / Scrum</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 关于我区域 */}
        <section className="about">
          <h2 className="section-title">关于我</h2>
          <div className="about-content">
            <p>
              我是一名充满激情的全栈开发工程师,拥有多年的 Web 开发经验。
              我专注于使用最新的技术栈构建高质量、用户友好的应用程序。
            </p>
            <p>
              我的工作方法注重代码质量、性能优化和用户体验。
              我相信持续学习和分享知识的重要性,经常在我的博客上分享技术见解和最佳实践。
            </p>
            <p>
              当我不在编码时,我喜欢探索新技术、参与开源项目,
              并与开发者社区保持联系。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
