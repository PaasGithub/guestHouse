// import { useState } from 'react';
import { Accommodation } from '../../../../payload-types';
import { Booking } from '@/app/types/dashboard';

export async function fetchAvailableRooms(
    checkIn: Date | string,
    checkOut: Date | string
  ): Promise<{ accommodation: Accommodation; unitsLeft: number }[]> {
    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates.");
      return []; // Return an empty array if input is invalid
    }
  
    try {
      // Fetch accommodations
      const accommodationsResponse = await fetch('/api/getAccommodations');
      const { docs: accommodations }: { docs: Accommodation[] } = await accommodationsResponse.json();
  
      // Fetch bookings
      const bookingsResponse = await fetch('/api/getBookings');
      const { docs: bookings }: { docs: Booking[] } = await bookingsResponse.json();
  
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
  
      if (!bookings) {
        console.error('Failed to fetch bookings data');
        return []; // Return an empty array if bookings data is missing
      }

      console.log("Bookings: " , bookings);
  
      const available = accommodations
        .map((accommodation) => {
          const totalUnits = accommodation.totalUnitsAvailable;
  
          // Filter bookings for this accommodation
          const accommodationBookings = bookings.filter(
            (booking) =>
              booking.bookingType === 'accommodation' &&
              booking.accommodation?.room.id === accommodation.id &&
              booking.status !== 'cancelled' &&
              new Date(booking.accommodation.checkIn) < checkOutDate &&
              new Date(booking.accommodation.checkOut) > checkInDate
          );
  
          // Calculate units left
          const unitsLeft = totalUnits - accommodationBookings.length;
  
          return {
            accommodation, // Include the accommodation details
            unitsLeft, // Include the units left
          };
        })
        .filter((item) => item.unitsLeft > 0); // Filter out accommodations with no units left
  
      return available; // Return the list of accommodations with units left
    } catch (err) {
      console.error('Error checking availability:', err);
      return []; // Return an empty array if an error occurs
    }
  }