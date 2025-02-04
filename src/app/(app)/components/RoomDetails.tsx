'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Accommodation, Media } from '../../../../payload-types';


function isMedia(image: number | Media): image is Media {
  return typeof image !== 'number' && 'url' in image;
}

export default function RoomDetails({ room }: { room: Accommodation }) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 py-8 bg-gray-100 dark:bg-gray-900 text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:mx-10">
        {/* Room Image */}
        <div className="relative h-96 w-full">
          <Image
            src={isMedia(room.image) && room.image.url ? room.image.url : '/idyllicHero.jpg'}
            alt={room.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        {/* Room Details */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{room.name}</h1>
          <p className="text-gray-600">{room.description}</p>
          <p className="text-2xl font-semibold">
            ${room.price}
            <span className="text-sm text-gray-500">/night</span>
          </p>
          <p className="text-gray-600">{room.totalNumberOfGuests} Guests</p>
          {/* Features */}
          {room.features && room.features.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xl font-bold">Features</h2>
                <ul className="list-disc list-inside">
                    {room.features.map((item: { feature?: string | null | undefined; id?: string | null | undefined }, index: number) => (
                        <li key={index} className="text-gray-600">
                        {item.feature}
                        </li>
                    ))}
                </ul>
            </div>
          )}
          {/* Book Now Button */}
          <button
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            onClick={() => router.push('/booking')}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}