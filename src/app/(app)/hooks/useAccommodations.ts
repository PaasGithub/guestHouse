'use client';

import { useState, useEffect } from 'react';
import { DashboardAccommodation } from '@/app/types/dashboard'; 

export const useAccommodations = () => {
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

  return { accommodations, isLoading };
};

// export default async function getAccommodations(){
//     let accomm: DashboardAccommodation | null = null;
//     try{
//         accomm = await fetchDoc<Accommodation>({
//             collection: 'accommodations',
//         })
//     }catch (error){console.error(error)}
// }