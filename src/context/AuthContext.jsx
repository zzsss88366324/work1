// 认证上下文 - 管理全局用户认证状态
import { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/api';

// 创建认证上下文
const AuthContext = createContext(null);

/**
 * 认证上下文提供者组件
 * 为整个应用提供认证状态和认证相关的函数
 */
export const AuthProvider = ({ children }) => {
  // 用户状态: 存储当前登录的用户信息
  const [user, setUser] = useState(null);

  // 令牌状态: 存储 JWT 认证令牌
  const [token, setToken] = useState(null);

  // 加载状态: 标识是否正在初始化认证状态
  const [loading, setLoading] = useState(true);

  // 组件挂载时,从 localStorage 恢复认证状态
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      // 如果存储中有令牌和用户信息,恢复到状态中
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    // 初始化完成
    setLoading(false);
  }, []);

  /**
   * 登录函数
   * @param {string} email - 用户邮箱
   * @param {string} password - 用户密码
   * @returns {Promise} - 返回登录结果
   */
  const login = async (email, password) => {
    try {
      // 调用 API 登录
      const response = await apiLogin({ email, password });

      // 保存令牌和用户信息到状态
      setToken(response.token);
      setUser(response.user);

      // 持久化保存到 localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      return response;
    } catch (error) {
      // 登录失败,抛出错误
      throw error;
    }
  };

  /**
   * 注册函数
   * @param {Object} userData - 用户注册数据 (username, email, password)
   * @returns {Promise} - 返回注册结果
   */
  const register = async (userData) => {
    try {
      // 调用 API 注册
      const response = await apiRegister(userData);

      // 注册成功后自动登录
      setToken(response.token);
      setUser(response.user);

      // 持久化保存到 localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      return response;
    } catch (error) {
      // 注册失败,抛出错误
      throw error;
    }
  };

  /**
   * 登出函数
   * 清除所有认证状态和本地存储
   */
  const logout = () => {
    // 清除状态
    setUser(null);
    setToken(null);

    // 清除本地存储
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  /**
   * 检查用户是否已登录
   * @returns {boolean} - 是否已认证
   */
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  // 提供给子组件的上下文值
  const value = {
    user,          // 当前用户信息
    token,         // 当前认证令牌
    login,         // 登录函数
    register,      // 注册函数
    logout,        // 登出函数
    isAuthenticated, // 检查是否已认证
    loading,       // 加载状态
  };

  // 如果还在初始化,显示加载状态
  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  // 通过 Provider 将认证状态提供给所有子组件
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * 自定义 Hook - 用于在组件中访问认证上下文
 * @returns {Object} - 认证上下文的值
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  // 如果在 AuthProvider 外部使用,抛出错误
  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 内部使用');
  }

  return context;
};

export default AuthContext;
