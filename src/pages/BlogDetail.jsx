// 博客详情页面 - 显示单篇博客文章和评论
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPost, addComment } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/BlogDetail.css';

/**
 * BlogDetail 组件
 * 显示单篇博客文章的详细内容和评论
 */
const BlogDetail = () => {
  const { id } = useParams(); // 从 URL 获取文章 ID
  const { isAuthenticated, user } = useAuth(); // 获取认证状态

  // 状态管理
  const [post, setPost] = useState(null); // 博客文章
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState(null); // 错误信息
  const [comment, setComment] = useState(''); // 评论内容
  const [commentLoading, setCommentLoading] = useState(false); // 评论提交状态
  const [commentError, setCommentError] = useState(null); // 评论错误
  const [commentSuccess, setCommentSuccess] = useState(false); // 评论成功

  // 组件挂载时获取博客文章
  useEffect(() => {
    fetchPost();
  }, [id]);

  /**
   * 从 API 获取博客文章详情
   */
  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);

      // 调用 API 获取文章详情
      const data = await getBlogPost(id);
      setPost(data);
    } catch (err) {
      // 处理错误
      setError(err.message || '获取文章失败');
      console.error('获取文章错误:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 处理评论表单提交
   */
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    // 验证评论内容
    if (!comment.trim()) {
      setCommentError('请输入评论内容');
      return;
    }

    try {
      setCommentLoading(true);
      setCommentError(null);
      setCommentSuccess(false);

      // 提交评论
      await addComment(id, {
        content: comment,
        author: user?.username || '匿名用户',
      });

      // 评论成功
      setCommentSuccess(true);
      setComment(''); // 清空表单

      // 重新获取文章以显示新评论
      await fetchPost();

      // 3秒后隐藏成功消息
      setTimeout(() => setCommentSuccess(false), 3000);
    } catch (err) {
      // 处理错误
      setCommentError(err.message || '评论提交失败');
      console.error('评论提交错误:', err);
    } finally {
      setCommentLoading(false);
    }
  };

  /**
   * 格式化日期
   */
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 加载状态
  if (loading) {
    return <div className="loading">加载文章中...</div>;
  }

  // 错误状态
  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
        <Link to="/blog" className="back-link">← 返回博客列表</Link>
      </div>
    );
  }

  // 文章不存在
  if (!post) {
    return (
      <div className="container">
        <div className="error">文章未找到</div>
        <Link to="/blog" className="back-link">← 返回博客列表</Link>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <div className="container">
        <Link to="/blog" className="back-link">← 返回博客列表</Link>

        {/* 文章内容 */}
        <article className="blog-post">
          <header className="post-header">
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <span className="post-date">{formatDate(post.createdAt || post.date)}</span>
              {post.author && <span className="post-author">作者: {post.author}</span>}
            </div>
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
          </header>

          {/* 文章正文 */}
          <div className="post-content">
            {post.content}
          </div>
        </article>

        {/* 评论区 */}
        <section className="comments-section">
          <h2 className="comments-title">评论</h2>

          {/* 评论表单 (仅登录用户可见) */}
          {isAuthenticated() ? (
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="写下你的评论..."
                rows="4"
                disabled={commentLoading}
                className="comment-textarea"
              />

              {commentError && <div className="error">{commentError}</div>}
              {commentSuccess && <div className="success">评论提交成功!</div>}

              <button
                type="submit"
                disabled={commentLoading || !comment.trim()}
                className="submit-btn"
              >
                {commentLoading ? '提交中...' : '提交评论'}
              </button>
            </form>
          ) : (
            <p className="login-prompt">
              请 <Link to="/login">登录</Link> 后发表评论
            </p>
          )}

          {/* 评论列表 */}
          <div className="comments-list">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <div key={comment._id || index} className="comment">
                  <div className="comment-header">
                    <span className="comment-author">{comment.author || '匿名用户'}</span>
                    <span className="comment-date">
                      {formatDate(comment.createdAt || comment.date)}
                    </span>
                  </div>
                  <p className="comment-content">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="no-comments">暂无评论,来抢沙发吧!</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogDetail;
