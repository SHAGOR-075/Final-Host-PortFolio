import React, { useState } from 'react';
import HeaderHero from './components/HeaderHero';
import SidebarNav from './components/SidebarNav';
import TabContent from './components/TabContent';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('about');

  const whatsappNumber = '8801928991286'; // without leading +
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="min-h-screen bg-bg">
      <HeaderHero />
      
      <div className="max-w-7xl mx-auto px-4 py-4 lg:py-8">
        {/* Mobile: Sidebar appears first, Desktop: Sidebar on left */}
        <div className="mb-4 lg:mb-0 lg:hidden">
          <SidebarNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <SidebarNav activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <TabContent activeTab={activeTab} />
          </div>
        </div>
      </div>
      
      <Footer />

      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M16 3C9.373 3 4 8.373 4 15c0 2.116.557 4.102 1.528 5.829L4 29l8.34-1.472A11.9 11.9 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10a9.87 9.87 0 0 1-3.996-.84l-.285-.12-4.93.87.905-4.854-.148-.25A9.87 9.87 0 0 1 6 15c0-5.514 4.486-10 10-10zm5.024 6.993c-.273-.137-1.617-.797-1.868-.887-.251-.09-.434-.137-.617.137-.184.273-.708.887-.868 1.07-.159.184-.319.205-.592.068-.273-.137-1.153-.425-2.197-1.356-.812-.724-1.36-1.616-1.519-1.89-.159-.273-.017-.421.12-.558.123-.122.273-.319.41-.478.137-.159.182-.273.273-.456.091-.182.046-.342-.023-.479-.068-.137-.617-1.49-.846-2.042-.223-.536-.451-.463-.617-.472-.159-.008-.342-.01-.525-.01s-.479.068-.73.342c-.251.273-.96.938-.96 2.287 0 1.349.983 2.651 1.12 2.834.137.182 1.936 2.958 4.69 4.147.655.283 1.168.452 1.567.579.658.21 1.258.18 1.732.109.528-.079 1.617-.661 1.845-1.299.228-.638.228-1.186.159-1.299-.068-.114-.251-.182-.524-.319z"
          />
        </svg>
      </a>
    </div>
  );
}
