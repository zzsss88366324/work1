// 博客列表页面
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts } from '../services/api';
import '../styles/Blog.css';

/**
 * Blog 组件
 * 显示所有博客文章的列表
 */
const Blog = () => {
  // 状态管理
  const [posts, setPosts] = useState([]); // 博客文章列表
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState(null); // 错误信息

  // 组件挂载时获取博客文章
  useEffect(() => {
    fetchPosts();
  }, []);

  /**
   * 从 API 获取博客文章列表
   */
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      // 调用 API 获取博客文章
      const data = await getBlogPosts();
      setPosts(data);
    } catch (err) {
      // 处理错误
      setError(err.message || '获取博客文章失败');
      console.error('获取博客错误:', err);
    } finally {
      setLoading(false);
    }
  };

  // 加载状态
  if (loading) {
    return <div className="loading">加载博客文章中...</div>;
  }

  // 错误状态
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="blog-page">
      <div className="container">
        <h1 className="page-title">博客</h1>
        <p className="page-subtitle">
          在这里,我分享关于 Web 开发、编程技巧和技术见解的文章。
        </p>

        {/* 博客文章列表 */}
        {posts.length === 0 ? (
          <p className="no-posts">暂无博客文章</p>
        ) : (
          <div className="blog-list">
            {posts.map((post) => (
              <BlogPostCard key={post._id || post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * BlogPostCard 组件
 * 显示单篇博客文章的卡片
 *
 * @param {Object} props - 组件属性
 * @param {Object} props.post - 博客文章数据
 */
const BlogPostCard = ({ post }) => {
  /**
   * 格式化日期
   * @param {string} date - 日期字符串
   * @returns {string} - 格式化后的日期
   */
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="blog-post-card">
      <div className="post-header">
        <h2 className="post-title">
          <Link to={`/blog/${post._id || post.id}`}>{post.title}</Link>
        </h2>
        <div className="post-meta">
          <span className="post-date">
            {formatDate(post.createdAt || post.date)}
          </span>
          {post.author && <span className="post-author">作者: {post.author}</span>}
        </div>
      </div>

      <p className="post-excerpt">
        {post.excerpt || post.content?.substring(0, 150) + '...'}
      </p>

      {/* 标签 */}
      {post.tags && post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <Link to={`/blog/${post._id || post.id}`} className="read-more">
        阅读全文 →
      </Link>
    </div>
  );
};

export default Blog;
