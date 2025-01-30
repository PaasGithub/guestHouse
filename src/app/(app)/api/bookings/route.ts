import { NextResponse } from 'next/server';

function validateBookingData(booking: BookingData) {
  if (!booking.bookingType || !['accommodation', 'event', 'combined'].includes(booking.bookingType)) {
    throw new Error('Invalid booking type');
  }

  if (booking.bookingType === 'accommodation' || booking.bookingType === 'combined') {
    if (!booking?.roomType || !booking?.checkIn || !booking?.checkOut) {
      throw new Error('Missing required fields for accommodation booking');
    }
  }

  if (booking.bookingType === 'event' || booking.bookingType === 'combined') {
    if (!booking?.eventDate || !booking?.startTime || !booking?.endTime) {
      throw new Error('Missing required fields for event booking');
    }
  }

  if (!booking?.guestFirstName || !booking?.guestLastName || !booking?.guestEmail) {
    throw new Error('Missing required guest information');
  }
}

// export async function POST(req: Request) {
//   try {
//     const booking = await req.json();
//     validateBookingData(booking);

//     // Proceed with the rest of the logic...
//   } catch (e: unknown) {
//     console.log(e);
//     const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
//     return NextResponse.json({ message: errorMessage }, { status: 400 });
//   }
// }

import { checkEventAvailability, checkRoomAvailability, createBooking } from '../../lib/bookingUtils';
import { BookingData } from '@/app/types/APItypes';

export async function POST(req: Request) {
  try {
    const booking = await req.json();
    console.log(booking);
    validateBookingData(booking);

    if (["accommodation", "combined"].includes(booking.bookingType)) {
      const isRoomAvailable = await checkRoomAvailability(
        booking.roomType,
        booking.checkIn,
        booking.checkOut
      );
      if (!isRoomAvailable) {
        return NextResponse.json(
          { message: "Selected room is not available for the given dates." },
          { status: 400 }
        );
      }
    }

    if (["event", "combined"].includes(booking.bookingType)) {
      const isEventAvailable = await checkEventAvailability(booking.eventDate);
      if (!isEventAvailable) {
        return NextResponse.json(
          { message: "The venue is not available on the selected event date." },
          { status: 400 }
        );
      }
    }

    const response = await createBooking(booking);
    return NextResponse.json(response, { status: 201 });

  } catch (e: unknown) {
    console.log(e);
    const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred";
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
