import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full h-full">
      <span className="loading loading-dots loading-lg text-primary"></span>
    </div>
  );
};

export default Loader;