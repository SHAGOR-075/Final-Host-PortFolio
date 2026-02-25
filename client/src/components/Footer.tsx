import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-panel border-t border-border py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent2 flex items-center justify-center">
            {/* <span className="text-sm font-bold text-white"></span> */}
            <img src="https://i.postimg.cc/Y9QgJc0D/portfolio.png"  />
          </div>
          <span className="text-xl font-bold text-text">Md Kharul Islam Shagor</span>
        </div>
        <p className="text-muted text-sm">
          © 2026 Md Kharul Islam Shagor. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
