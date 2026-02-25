import React from 'react';

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, className }) => {
  return (
    <div className={`w-full bg-card2 rounded-full h-2 ${className}`}>
      <div 
        className="bg-gradient-to-r from-accent to-accent2 h-2 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
