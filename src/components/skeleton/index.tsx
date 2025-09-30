import React from "react";

interface SkeletonProps {
  limit: number; // gunakan 'number', bukan 'Number'
}

const Skeleton: React.FC<SkeletonProps> = ({ limit }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: limit }).map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse flex flex-col items-center bg-gray-800 rounded-2xl p-4"
        >
          <div className="h-24 w-24 bg-gray-700 rounded-full mb-2"></div>
          <div className="h-4 w-16 bg-gray-700 rounded mb-1"></div>
          <div className="h-3 w-10 bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
