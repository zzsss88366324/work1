// 项目页面 - 显示所有项目的画廊
import { useState, useEffect } from 'react';
import { getProjects } from '../services/api';
import '../styles/Projects.css';

/**
 * Projects 组件
 * 从 API 获取并显示所有项目
 */
const Projects = () => {
  // 状态管理
  const [projects, setProjects] = useState([]); // 项目列表
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState(null); // 错误信息

  // 组件挂载时获取项目数据
  useEffect(() => {
    fetchProjects();
  }, []);

  /**
   * 从 API 获取项目列表
   */
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      // 调用 API 获取项目
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      // 处理错误
      setError(err.message || '获取项目失败');
      console.error('获取项目错误:', err);
    } finally {
      setLoading(false);
    }
  };

  // 加载状态
  if (loading) {
    return <div className="loading">加载项目中...</div>;
  }

  // 错误状态
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="projects-page">
      <div className="container">
        <h1 className="page-title">我的项目</h1>
        <p className="page-subtitle">
          这里展示了我最近参与的一些项目,涵盖了各种技术栈和应用场景。
        </p>

        {/* 项目网格 */}
        {projects.length === 0 ? (
          <p className="no-projects">暂无项目</p>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project._id || project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * ProjectCard 组件
 * 显示单个项目的卡片
 *
 * @param {Object} props - 组件属性
 * @param {Object} props.project - 项目数据
 */
const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      {/* 项目图片 (如果有) */}
      {project.image && (
        <div className="project-image">
          <img src={project.image} alt={project.title} />
        </div>
      )}

      {/* 项目信息 */}
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        {/* 技术栈标签 */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="project-tech">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* 项目链接 */}
        <div className="project-links">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              在线演示
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
