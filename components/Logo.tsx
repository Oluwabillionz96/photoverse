import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Abstract logo - circle with inner arc, representing a photo aperture/lens */}
        <circle
          cx="20"
          cy="20"
          r="14"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M 20 10 A 10 10 0 0 1 20 30"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default Logo;
