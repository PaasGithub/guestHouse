'use client';

const BookingAdminViewSkeleton= () => {
    return (
      <div className="animate-pulse bg-gray-100 p-4 rounded-lg">
        <div className="h-8 bg-gray-200 mb-4 rounded"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 mb-2 rounded"></div>
        ))}
      </div>
    );
}

export default BookingAdminViewSkeleton; 