import React from 'react';
import { User, FileText, Briefcase, BookOpen, MessageCircle } from 'lucide-react';

interface SidebarNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'about', label: 'About', icon: User },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
  ];

  return (
    <nav className="bg-panel rounded-xl p-2 shadow-card">
      {/* Mobile: Horizontal scrollable */}
      <ul className="flex lg:flex-col gap-2 lg:space-y-1 overflow-x-auto lg:overflow-x-visible scrollbar-hide">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <li key={item.id} className="flex-shrink-0">
              <button
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-accent text-white shadow-accent'
                    : 'text-muted hover:text-text hover:bg-card'
                }`}
              >
                <Icon size={18} className="lg:w-5 lg:h-5" />
                <span className="text-sm lg:text-base">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SidebarNav;
