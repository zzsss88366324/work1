// 管理员仪表板 - 管理项目和博客文章
import { useState, useEffect } from 'react';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '../services/api';
import '../styles/AdminDashboard.css';

/**
 * AdminDashboard 组件
 * 受保护的管理员页面,用于管理项目和博客文章
 */
const AdminDashboard = () => {
  // 标签页状态: 'projects' 或 'blog'
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1 className="page-title">管理员仪表板</h1>
        <p className="page-subtitle">管理你的项目和博客文章</p>

        {/* 标签页导航 */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            项目管理
          </button>
          <button
            className={`tab ${activeTab === 'blog' ? 'active' : ''}`}
            onClick={() => setActiveTab('blog')}
          >
            博客管理
          </button>
        </div>

        {/* 标签页内容 */}
        <div className="tab-content">
          {activeTab === 'projects' ? <ProjectsManager /> : <BlogManager />}
        </div>
      </div>
    </div>
  );
};

/**
 * ProjectsManager 组件
 * 管理项目的 CRUD 操作
 */
const ProjectsManager = () => {
  const [projects, setProjects] = useState([]); // 项目列表
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState(null); // 错误信息
  const [editingProject, setEditingProject] = useState(null); // 正在编辑的项目
  const [showForm, setShowForm] = useState(false); // 是否显示表单

  // 组件挂载时获取项目
  useEffect(() => {
    fetchProjects();
  }, []);

  /**
   * 获取所有项目
   */
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err.message || '获取项目失败');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 删除项目
   */
  const handleDelete = async (id) => {
    if (!window.confirm('确定要删除这个项目吗?')) return;

    try {
      await deleteProject(id);
      await fetchProjects(); // 重新获取项目列表
    } catch (err) {
      alert('删除项目失败: ' + err.message);
    }
  };

  /**
   * 开始编辑项目
   */
  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  /**
   * 创建新项目
   */
  const handleCreate = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  /**
   * 表单提交成功后
   */
  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProject(null);
    fetchProjects();
  };

  if (loading) return <div className="loading">加载中...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="manager-section">
      {/* 操作按钮 */}
      <div className="manager-header">
        <button onClick={handleCreate} className="create-btn">
          + 创建新项目
        </button>
      </div>

      {/* 项目表单 */}
      {showForm && (
        <ProjectForm
          project={editingProject}
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* 项目列表 */}
      <div className="items-list">
        {projects.length === 0 ? (
          <p className="no-items">暂无项目</p>
        ) : (
          projects.map((project) => (
            <div key={project._id || project.id} className="item-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="item-actions">
                <button onClick={() => handleEdit(project)} className="edit-btn">
                  编辑
                </button>
                <button
                  onClick={() => handleDelete(project._id || project.id)}
                  className="delete-btn"
                >
                  删除
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

/**
 * ProjectForm 组件
 * 项目创建/编辑表单
 */
const ProjectForm = ({ project, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    technologies: project?.technologies?.join(', ') || '',
    liveUrl: project?.liveUrl || '',
    githubUrl: project?.githubUrl || '',
    image: project?.image || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = {
        ...formData,
        technologies: formData.technologies.split(',').map((t) => t.trim()),
      };

      if (project) {
        // 更新现有项目
        await updateProject(project._id || project.id, data);
      } else {
        // 创建新项目
        await createProject(data);
      }

      onSuccess();
    } catch (err) {
      setError(err.message || '操作失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-modal">
      <div className="form-container">
        <h2>{project ? '编辑项目' : '创建新项目'}</h2>
        <form onSubmit={handleSubmit} className="crud-form">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="项目标题"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="项目描述"
            rows="3"
            required
          />
          <input
            type="text"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            placeholder="技术栈 (用逗号分隔, 如: React, Node.js, MongoDB)"
          />
          <input
            type="url"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
            placeholder="在线演示链接"
          />
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            placeholder="GitHub 链接"
          />
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="项目图片 URL"
          />
          {error && <div className="error">{error}</div>}
          <div className="form-actions">
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? '保存中...' : project ? '更新' : '创建'}
            </button>
            <button type="button" onClick={onCancel} className="cancel-btn">
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/**
 * BlogManager 组件
 * 管理博客文章的 CRUD 操作
 */
const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getBlogPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err.message || '获取博客文章失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('确定要删除这篇文章吗?')) return;

    try {
      await deleteBlogPost(id);
      await fetchPosts();
    } catch (err) {
      alert('删除文章失败: ' + err.message);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingPost(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingPost(null);
    fetchPosts();
  };

  if (loading) return <div className="loading">加载中...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="manager-section">
      <div className="manager-header">
        <button onClick={handleCreate} className="create-btn">
          + 创建新文章
        </button>
      </div>

      {showForm && (
        <BlogForm
          post={editingPost}
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="items-list">
        {posts.length === 0 ? (
          <p className="no-items">暂无博客文章</p>
        ) : (
          posts.map((post) => (
            <div key={post._id || post.id} className="item-card">
              <h3>{post.title}</h3>
              <p>{post.excerpt || post.content?.substring(0, 100) + '...'}</p>
              <div className="item-actions">
                <button onClick={() => handleEdit(post)} className="edit-btn">
                  编辑
                </button>
                <button
                  onClick={() => handleDelete(post._id || post.id)}
                  className="delete-btn"
                >
                  删除
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

/**
 * BlogForm 组件
 * 博客文章创建/编辑表单
 */
const BlogForm = ({ post, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    tags: post?.tags?.join(', ') || '',
    author: post?.author || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = {
        ...formData,
        tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      };

      if (post) {
        await updateBlogPost(post._id || post.id, data);
      } else {
        await createBlogPost(data);
      }

      onSuccess();
    } catch (err) {
      setError(err.message || '操作失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-modal">
      <div className="form-container">
        <h2>{post ? '编辑文章' : '创建新文章'}</h2>
        <form onSubmit={handleSubmit} className="crud-form">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="文章标题"
            required
          />
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="文章摘要"
            rows="2"
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="文章内容"
            rows="8"
            required
          />
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="标签 (用逗号分隔, 如: React, JavaScript, Tutorial)"
          />
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="作者"
          />
          {error && <div className="error">{error}</div>}
          <div className="form-actions">
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? '保存中...' : post ? '更新' : '创建'}
            </button>
            <button type="button" onClick={onCancel} className="cancel-btn">
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
