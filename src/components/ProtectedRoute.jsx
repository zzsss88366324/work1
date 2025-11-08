// 受保护路由组件 - 用于保护需要认证的页面
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute 组件
 * 检查用户是否已认证,如果未认证则重定向到登录页面
 *
 * @param {Object} props - 组件属性
 * @param {ReactNode} props.children - 子组件(受保护的页面内容)
 * @returns {ReactNode} - 返回子组件或重定向到登录页面
 */
const ProtectedRoute = ({ children }) => {
  // 从认证上下文获取认证状态
  const { isAuthenticated } = useAuth();

  // 如果用户未认证,重定向到登录页面
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // 如果用户已认证,渲染受保护的内容
  return children;
};

export default ProtectedRoute;
