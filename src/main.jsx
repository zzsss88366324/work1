// 应用入口文件
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

/**
 * 应用入口点
 * 将 React 应用挂载到 DOM 中的 root 元素
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode 用于开发环境中检测潜在问题
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
