import React from "react";

const DetailSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {/* Pokemon Info Skeleton */}
      <div className="animate-pulse bg-gray-800 rounded-2xl p-4 h-64 flex flex-col items-center justify-center">
        <div className="h-32 w-32 bg-gray-700 rounded-full mb-4"></div>
        <div className="h-6 w-24 bg-gray-700 rounded mb-2"></div>
        <div className="h-4 w-16 bg-gray-700 rounded"></div>
      </div>

      {/* Stats Skeleton */}
      <div className="animate-pulse bg-gray-800 rounded-2xl p-4 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-1">
            <div className="h-4 w-20 bg-gray-700 rounded"></div>
            <div className="h-3 w-full bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>

      {/* Abilities Skeleton */}
      <div className="animate-pulse bg-gray-800 rounded-2xl p-4 h-32"></div>

      {/* Moves Skeleton */}
      <div className="animate-pulse bg-gray-800 rounded-2xl p-4 h-32"></div>

      {/* Catch Button Skeleton */}
      <div className="col-span-1 md:col-span-2 flex justify-center">
        <div className="animate-pulse h-10 w-40 bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
