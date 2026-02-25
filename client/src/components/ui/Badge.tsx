import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'accent' | 'secondary';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'accent', className }) => {
  const variants = {
    accent: "bg-accent text-white",
    secondary: "bg-card2 text-muted border border-border"
  };

  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;
