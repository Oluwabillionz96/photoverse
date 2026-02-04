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
        {/* Abstract geometric logo inspired by photo/gallery concept */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        
        {/* Main geometric shape - abstract representation of overlapping frames/photos */}
        <path
          d="M8 12C8 9.79086 9.79086 8 12 8H28C30.2091 8 32 9.79086 32 12V20C32 22.2091 30.2091 24 28 24H20L16 28L12 24H12C9.79086 24 8 22.2091 8 20V12Z"
          fill="url(#logoGradient)"
          className="opacity-90"
        />
        
        {/* Secondary overlapping element */}
        <path
          d="M12 16C12 13.7909 13.7909 12 16 12H32C34.2091 12 36 13.7909 36 16V28C36 30.2091 34.2091 32 32 32H16C13.7909 32 12 30.2091 12 28V16Z"
          fill="currentColor"
          className="opacity-40"
        />
        
        {/* Accent dot - represents the "verse" in photoverse */}
        <circle
          cx="24"
          cy="20"
          r="2"
          fill="currentColor"
          className="opacity-80"
        />
      </svg>
    </div>
  );
};

export default Logo;