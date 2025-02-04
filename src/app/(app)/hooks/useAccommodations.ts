'use client';

import { useState, useEffect } from 'react';
import { Accommodation } from '../../../../payload-types';

export const useAccommodations = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
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


