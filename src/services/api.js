// API 服务文件 - 集中管理所有 API 请求

// API 基础 URL - 请替换为你的后端 API 地址
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * 通用的 fetch 请求封装函数
 * @param {string} endpoint - API 端点路径
 * @param {object} options - fetch 请求选项
 * @returns {Promise} - 返回响应数据或抛出错误
 */
const apiRequest = async (endpoint, options = {}) => {
  // 从 localStorage 获取认证令牌
  const token = localStorage.getItem('token');

  // 设置默认请求头
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // 如果存在令牌,添加到请求头
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    // 发送请求
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // 如果响应不成功,抛出错误
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '请求失败');
    }

    // 返回 JSON 数据
    return await response.json();
  } catch (error) {
    // 抛出错误供调用者处理
    throw error;
  }
};

// ==================== 项目相关 API ====================

/**
 * 获取所有项目
 * @returns {Promise<Array>} - 项目列表
 */
export const getProjects = () => {
  return apiRequest('/projects');
};

/**
 * 获取单个项目详情
 * @param {string} id - 项目 ID
 * @returns {Promise<Object>} - 项目详情
 */
export const getProject = (id) => {
  return apiRequest(`/projects/${id}`);
};

/**
 * 创建新项目 (需要认证)
 * @param {Object} projectData - 项目数据
 * @returns {Promise<Object>} - 创建的项目
 */
export const createProject = (projectData) => {
  return apiRequest('/projects', {
    method: 'POST',
    body: JSON.stringify(projectData),
  });
};

/**
 * 更新项目 (需要认证)
 * @param {string} id - 项目 ID
 * @param {Object} projectData - 更新的项目数据
 * @returns {Promise<Object>} - 更新后的项目
 */
export const updateProject = (id, projectData) => {
  return apiRequest(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(projectData),
  });
};

/**
 * 删除项目 (需要认证)
 * @param {string} id - 项目 ID
 * @returns {Promise<Object>} - 删除结果
 */
export const deleteProject = (id) => {
  return apiRequest(`/projects/${id}`, {
    method: 'DELETE',
  });
};

// ==================== 博客相关 API ====================

/**
 * 获取所有博客文章
 * @returns {Promise<Array>} - 博客文章列表
 */
export const getBlogPosts = () => {
  return apiRequest('/blog');
};

/**
 * 获取单篇博客文章
 * @param {string} id - 文章 ID
 * @returns {Promise<Object>} - 文章详情
 */
export const getBlogPost = (id) => {
  return apiRequest(`/blog/${id}`);
};

/**
 * 创建新博客文章 (需要认证)
 * @param {Object} postData - 文章数据
 * @returns {Promise<Object>} - 创建的文章
 */
export const createBlogPost = (postData) => {
  return apiRequest('/blog', {
    method: 'POST',
    body: JSON.stringify(postData),
  });
};

/**
 * 更新博客文章 (需要认证)
 * @param {string} id - 文章 ID
 * @param {Object} postData - 更新的文章数据
 * @returns {Promise<Object>} - 更新后的文章
 */
export const updateBlogPost = (id, postData) => {
  return apiRequest(`/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify(postData),
  });
};

/**
 * 删除博客文章 (需要认证)
 * @param {string} id - 文章 ID
 * @returns {Promise<Object>} - 删除结果
 */
export const deleteBlogPost = (id) => {
  return apiRequest(`/blog/${id}`, {
    method: 'DELETE',
  });
};

/**
 * 为博客文章添加评论
 * @param {string} postId - 文章 ID
 * @param {Object} commentData - 评论数据
 * @returns {Promise<Object>} - 添加的评论
 */
export const addComment = (postId, commentData) => {
  return apiRequest(`/blog/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify(commentData),
  });
};

// ==================== 联系表单 API ====================

/**
 * 提交联系表单
 * @param {Object} contactData - 联系表单数据
 * @returns {Promise<Object>} - 提交结果
 */
export const submitContact = (contactData) => {
  return apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(contactData),
  });
};

// ==================== 用户认证 API ====================

/**
 * 用户注册
 * @param {Object} userData - 用户数据 (username, email, password)
 * @returns {Promise<Object>} - 注册结果 (包含 token 和 user 信息)
 */
export const register = (userData) => {
  return apiRequest('/users/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

/**
 * 用户登录
 * @param {Object} credentials - 登录凭证 (email, password)
 * @returns {Promise<Object>} - 登录结果 (包含 token 和 user 信息)
 */
export const login = (credentials) => {
  return apiRequest('/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

/**
 * 获取当前用户信息 (需要认证)
 * @returns {Promise<Object>} - 用户信息
 */
export const getCurrentUser = () => {
  return apiRequest('/users/me');
};
