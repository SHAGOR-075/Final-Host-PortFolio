import React from 'react';
import AboutSection from './sections/AboutSection';
import ResumeSection from './sections/ResumeSection';
import WorkSection from './sections/WorkSection';
import BlogSection from './sections/BlogSection';
import ContactSection from './sections/ContactSection';

interface TabContentProps {
  activeTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutSection />;
      case 'resume':
        return <ResumeSection />;
      case 'work':
        return <WorkSection />;
      case 'blog':
        return <BlogSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <AboutSection />;
    }
  };

  return (
    <div className="animate-fade-in">
      {renderContent()}
    </div>
  );
};

export default TabContent;
