import React from 'react';

const RoomSkeleton = () => {
  return (
    <div className="grid-item wow fadeInUp animated" data-wow-delay="0.3s">
      <div className="item-inner relative overflow-hidden group shadow-lg hover:shadow-xl transition-shadow">
        {/* Thumbnail Skeleton */}
        <div className="relative h-96 w-full bg-gray-200 dark:bg-gray-800 animate-pulse"></div>

        {/* Overlay Skeleton */}
        <div className="absolute z-20 bg-primary dark:bg-gray-800 bg-cover bg-no-repeat h-full w-full top-0 transition-opacity duration-500 opacity-0 hover:opacity-100">
          <div className="opacity-100 z-[4] mt-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 absolute text-white text-center">
            <div className="text-[14px] bg-gray-300 dark:bg-gray-700 h-4 w-16 mx-auto mb-2 animate-pulse"></div>
            <h3 className="text-[40px] leading-none mb-6 mt-0 bg-gray-300 dark:bg-gray-700 h-10 w-24 mx-auto animate-pulse"></h3>
            <button className="inline-block text-center font-medium uppercase px-5 text-[12px] tracking-[2px] rounded-none min-h-[37px] leading-[37px] border border-white/35 bg-gray-300 dark:bg-gray-700 animate-pulse"></button>
          </div>
        </div>

        {/* Bottom Gradient Skeleton */}
        <div className="bottom-0 left-0 right-0 text-center text-white absolute bg-gradient-to-t from-[#ab8965] to-[#ab896500] dark:from-gray-800 dark:to-gray-800/0 h-[40%] w-full transition-all duration-500 py-16">
          <h3 className="leading-[1.4em] text-[30px] mb-0 bg-gray-300 dark:bg-gray-700 h-8 w-48 mx-auto animate-pulse"></h3>
          <div className="text-center space-x-4 text-[14px]">
            <span className="bg-gray-300 dark:bg-gray-700 h-4 w-16 inline-block animate-pulse"></span>
            <span className="bg-gray-300 dark:bg-gray-700 h-4 w-16 inline-block animate-pulse"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSkeleton;