import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import WorkManagement from './pages/WorkManagement';
import BlogManagement from './pages/BlogManagement';
import SkillsManagement from './pages/SkillsManagement';
import CVUpload from './pages/CVUpload';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    const auth = localStorage.getItem('admin_auth');
    setIsAuthenticated(!!auth);
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-text">Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <Dashboard onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<div />} />
      </Route>
      <Route
        path="/work"
        element={
          isAuthenticated ? (
            <Dashboard onLogout={handleLogout}><WorkManagement /></Dashboard>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/blog"
        element={
          isAuthenticated ? (
            <Dashboard onLogout={handleLogout}><BlogManagement /></Dashboard>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/skills"
        element={
          isAuthenticated ? (
            <Dashboard onLogout={handleLogout}><SkillsManagement /></Dashboard>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/cv"
        element={
          isAuthenticated ? (
            <Dashboard onLogout={handleLogout}><CVUpload /></Dashboard>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

