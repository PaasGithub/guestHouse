'use client'
import { DashboardAccommodation } from '@/app/types/dashboard';
import Image from 'next/image';
// app/accommodations/page.tsx

//  import {accommodations} from '../../lib/data'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import GetAccommodationsSkeleton from '../skeletons/getAccommodationsSkeleton'; 


 export default function AccommodationsPage() {
  const router = useRouter()
  const [accommodations, setAccommodations] = useState<DashboardAccommodation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchAccommodations = async () => {
      try{
        const response = await fetch('/api/getAccommodations');
        // console.log(response);
        const data = await response.json();
        // console.log("accommodation data: ");
        // console.log(data);
        setAccommodations(data.docs);
      } catch(error) {
        console.error('Error fetching accommodations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAccommodations();
  }, []);

  return isLoading ? <GetAccommodationsSkeleton/> : (
    <div className=" mx-auto px-4 py-6 min-h-screen bg-gray-50 text-black">
      <h1 className="text-3xl font-bold text-center my-8">Our Accommodations</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {accommodations.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* <img 
              src={room.image.url} 
              alt={room.name}
              className="w-full h-48 object-cover"
            /> */}
            <Image 
              src={room.image.url} 
              alt={room.name}
              className="w-full h-48 object-cover"
              width={500}
              height={500}
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold">{room.name}</h2>
              <p className="text-gray-600 mt-2">{room.description}</p>
              <div className="mt-4">
                <h3 className="font-medium">Features:</h3>
                <ul className="mt-2 grid grid-cols-2 gap-2">
                  {room.features.map((feature) => (
                    <li key={feature.feature} className="text-sm text-gray-600">• {feature.feature}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xl font-bold">${room.price}/night</span>
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => {
                    router.push(`/booking?roomType=${room.id}`)
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
  )
 }