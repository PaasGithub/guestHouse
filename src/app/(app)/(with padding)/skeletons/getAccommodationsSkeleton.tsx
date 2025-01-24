'use client';

const GetAccommodationsSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50 py-6 px-4">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="bg-white rounded-lg shadow animate-pulse overflow-hidden">
          <div className="w-full h-48 bg-gray-200"></div>
          <div className="p-6">
            <div className="h-6 bg-gray-200 mb-4 rounded"></div>
            <div className="h-4 bg-gray-200 mb-2 rounded"></div>
            <div className="h-4 bg-gray-200 mb-2 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="mt-4 flex justify-between items-center">
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
              <div className="h-8 w-24 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetAccommodationsSkeleton;
