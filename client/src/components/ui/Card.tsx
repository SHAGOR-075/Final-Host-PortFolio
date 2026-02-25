import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
  return (
    <div 
      className={cn(
        "bg-panel border border-border rounded-xl shadow-card",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
