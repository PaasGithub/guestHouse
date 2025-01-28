"use client";

// import { useRouter } from "next/navigation";

import GetAccommodationsSkeleton from "../skeletons/getAccommodationsSkeleton";
import RoomCard from "../../components/RoomCard";
import { useAccommodations } from "../../hooks/useAccommodations";

export default function AccommodationsPage() {
  // const router = useRouter();

  const { accommodations, isLoading } = useAccommodations();



  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Our Accommodations
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {isLoading ? 
          (
            Array.from({ length: 6 }).map((_, index) => (
              <GetAccommodationsSkeleton key={index} />
            ))
          ) : 
        
          (
            
            accommodations.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))
            
          )
        }
        </div>


      </div>
    </div>
  );
}
