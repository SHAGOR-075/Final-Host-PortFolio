import { Link } from 'react-router-dom';
import { Briefcase, BookOpen, Code, FileText, ArrowRight } from 'lucide-react';

const DashboardHome = () => {
  const stats = [
    { label: 'Work Items', value: '6', icon: Briefcase, path: '/work', color: 'bg-accent' },
    { label: 'Blog Posts', value: '6', icon: BookOpen, path: '/blog', color: 'bg-blue-500' },
    { label: 'Skills', value: '8', icon: Code, path: '/skills', color: 'bg-green-500' },
    { label: 'CV Status', value: 'Uploaded', icon: FileText, path: '/cv', color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text mb-2">Dashboard</h1>
        <p className="text-muted">Welcome to the Portfolio Admin Panel</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.path}
              to={stat.path}
              className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
                <ArrowRight className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" size={20} />
              </div>
              <h3 className="text-2xl font-bold text-text mb-1">{stat.value}</h3>
              <p className="text-muted text-sm">{stat.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold text-text mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/work"
              className="flex items-center justify-between p-4 bg-panel border border-border rounded-lg hover:border-accent transition-colors"
            >
              <span className="text-text">Add New Work Item</span>
              <ArrowRight size={18} className="text-muted" />
            </Link>
            <Link
              to="/blog"
              className="flex items-center justify-between p-4 bg-panel border border-border rounded-lg hover:border-accent transition-colors"
            >
              <span className="text-text">Add New Blog Post</span>
              <ArrowRight size={18} className="text-muted" />
            </Link>
            <Link
              to="/skills"
              className="flex items-center justify-between p-4 bg-panel border border-border rounded-lg hover:border-accent transition-colors"
            >
              <span className="text-text">Manage Skills</span>
              <ArrowRight size={18} className="text-muted" />
            </Link>
            <Link
              to="/cv"
              className="flex items-center justify-between p-4 bg-panel border border-border rounded-lg hover:border-accent transition-colors"
            >
              <span className="text-text">Upload CV</span>
              <ArrowRight size={18} className="text-muted" />
            </Link>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold text-text mb-4">System Info</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted">Admin Panel Version</span>
              <span className="text-text font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted">Last Updated</span>
              <span className="text-text font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted">Status</span>
              <span className="text-green-400 font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

