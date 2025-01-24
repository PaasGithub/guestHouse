'use client';

const BookingStatsGraphSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="p-4 rounded-lg shadow animate-pulse">
          <div className="h-6 bg-gray-200 mb-4 rounded"></div>
          <div className="h-40 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default BookingStatsGraphSkeleton;