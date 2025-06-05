import React from 'react';

const Spinner = ({
  size = 'xl', // Make it big by default
  color = 'blue',
  speed = 'normal',
  className = ''
}) => {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-16 h-16' // bigger spinner
  };

  const colorClasses = {
    blue: 'border-blue-500',
    indigo: 'border-indigo-500',
    purple: 'border-purple-500',
    pink: 'border-pink-500',
    red: 'border-red-500',
    orange: 'border-orange-500',
    yellow: 'border-yellow-500',
    green: 'border-green-500',
    teal: 'border-teal-500',
    cyan: 'border-cyan-500',
    gray: 'border-gray-500',
  };

  const speedClasses = {
    slow: 'animate-spin-slow',
    normal: 'animate-spin',
    fast: 'animate-spin-fast'
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div
        className={`relative inline-block ${sizeClasses[size]} ${className}`}
        aria-label="Loading"
        role="status"
      >
        <div
          className={`absolute inset-0 rounded-full border-4 border-transparent border-t-${colorClasses[color].split('-')[1]} ${speedClasses[speed]}`}
        ></div>
        <div
          className={`absolute inset-1 rounded-full border-4 ${colorClasses[color]} opacity-20`}
        ></div>
        <div
          className={`absolute inset-4 rounded-full ${colorClasses[color]}`}
        ></div>
      </div>
    </div>
  );
};

// Custom animation speeds
const addSpinnerAnimations = () => {
  if (typeof document === 'undefined') return;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin-slow {
      to { transform: rotate(360deg); }
    }
    @keyframes spin-fast {
      to { transform: rotate(360deg); }
    }
    .animate-spin-slow {
      animation: spin-slow 2s linear infinite;
    }
    .animate-spin {
      animation: spin 1.5s linear infinite;
    }
    .animate-spin-fast {
      animation: spin-fast 0.8s linear infinite;
    }
  `;
  document.head.appendChild(style);
};

if (typeof window !== 'undefined') {
  addSpinnerAnimations();
}

export default Spinner;
