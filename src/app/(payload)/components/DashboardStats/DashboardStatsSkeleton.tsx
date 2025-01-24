'use client';

const DashboardStatsSkeleton = () => {
  return (
    <div className="flex gap-4 text-black">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md flex-1 animate-pulse">
        <div className="h-6 bg-gray-200 mb-4 rounded"></div>
        <div className="h-8 bg-gray-300 rounded"></div>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md flex-1 animate-pulse">
        <div className="h-6 bg-gray-200 mb-4 rounded"></div>
        <div className="h-8 bg-gray-300 rounded"></div>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md flex-1 animate-pulse">
        <div className="h-6 bg-gray-200 mb-4 rounded"></div>
        <div className="h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default DashboardStatsSkeleton;