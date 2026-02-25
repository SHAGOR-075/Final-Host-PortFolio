import { Outlet, Link, useLocation } from 'react-router-dom';
import { LogOut, Briefcase, BookOpen, Code, FileText, Layout } from 'lucide-react';
import DashboardHome from './DashboardHome';

interface DashboardProps {
  onLogout: () => void;
  children?: React.ReactNode;
}

const Dashboard = ({ onLogout, children }: DashboardProps) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: Layout, label: 'Dashboard' },
    { path: '/work', icon: Briefcase, label: 'Work Management' },
    { path: '/blog', icon: BookOpen, label: 'Blog Management' },
    { path: '/skills', icon: Code, label: 'Skills Management' },
    { path: '/cv', icon: FileText, label: 'CV Upload' },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text">Admin Panel</h1>
          <p className="text-sm text-muted mt-1">Portfolio Dashboard</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-accent text-white'
                    : 'text-muted hover:bg-panel hover:text-text'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          onClick={onLogout}
          className="mt-8 w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted hover:bg-panel hover:text-text transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {children || (location.pathname === '/dashboard' || location.pathname === '/dashboard/' ? <DashboardHome /> : <Outlet />)}
      </div>
    </div>
  );
};

export default Dashboard;

