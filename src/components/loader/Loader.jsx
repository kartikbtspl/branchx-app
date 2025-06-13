import React from 'react';

const Loader = () => {
  return (
    <div className="flex inset-0 w-full items-center justify-center ">
      <div className="relative">
        {/* Outer circle */}
        <div className="w-24 h-24 border-8 border-gray-200 rounded-full"></div>
        
        {/* Animated inner circle */}
        <div className="absolute top-0 left-0 w-24 h-24 border-8 border-t-[#526E95] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;