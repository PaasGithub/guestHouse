'use client'

import { DashboardAccommodation } from '@/app/types/dashboard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import GetAccommodationsSkeleton from '../skeletons/getAccommodationsSkeleton';

export default function AccPage() {
  const router = useRouter();
  const [accommodations, setAccommodations] = useState<DashboardAccommodation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await fetch('/api/getAccommodations');
        const data = await response.json();
        setAccommodations(data.docs);
      } catch (error) {
        console.error('Error fetching accommodations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAccommodations();
  }, []);

  if (isLoading) {
    return <GetAccommodationsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Our Accommodations
        </h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accommodations.map((room) => (
            <div
              key={room.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={room.image.url}
                  alt={room.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {room.name}
                </h2>
                {/* Fixed height for description */}
                {/* <div className="mt-2 h-20 overflow-hidden">
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                    {room.description}
                  </p>
                </div> */}
                <div className="mt-4">
                  {/* <h3 className="font-medium text-gray-900 dark:text-white">Features:</h3> */}
                  <ul className="mt-2 h-10 grid grid-cols-2 gap-2">
                    {room.features.map((feature) => (
                      <li
                        key={feature.feature}
                        className="text-sm text-gray-600 dark:text-gray-300"
                      >
                        • {feature.feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    ${room.price}/night
                  </span>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      router.push(`/booking?roomType=${room.id}`);
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}