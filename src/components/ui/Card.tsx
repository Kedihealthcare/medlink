import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverable = false }) => {
  const hoverStyles = hoverable ? 'hover:shadow-md hover:border-sky-300 cursor-pointer transition-all duration-200' : '';
  
  return (
    <div 
      className={`bg-white border border-slate-200 rounded-xl shadow-sm p-6 ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
