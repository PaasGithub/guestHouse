import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import payloadConfig from '@payload-config';

type CalendarEvent = {
  date: string; // ISO 8601 string
  color: string; // CSS color
};

interface Booking {
  bookingType: 'accommodation' | 'event' | 'combined';
  accommodation?: {
    checkIn: string;
    checkOut: string;
  };
  event?: {
    eventDate: string;
  };
}

export async function GET() {

  // console.log("Calendar route reached!!")
  try {
    const payload = await getPayload({ config: payloadConfig });

    // Fetch bookings from Payload CMS
    const bookings = await payload.find({
      collection: 'bookings',
    })

    // console.log(payload);

    // console.log(bookings);

    // Transform bookings into calendar events
    const events: CalendarEvent[] = bookings.docs.flatMap((booking: Booking) => {
      const { bookingType, accommodation, event } = booking;
    
      if ((bookingType === 'accommodation' || bookingType === 'combined') && accommodation?.checkIn) {
        const checkInEvent: CalendarEvent = {
          date: accommodation.checkIn,
          color: bookingType === 'combined' ? 'combine' : 'orange',
        };
        const checkOutEvent: CalendarEvent | null = accommodation.checkOut ? {
          date: accommodation.checkOut,
          color: bookingType === 'combined' ? 'combine' : 'orange',
        } : null;
        return [checkInEvent, checkOutEvent].filter(Boolean) as CalendarEvent[];
      }
    
      if (bookingType === 'event' && event?.eventDate) {
        return [{
          date: event.eventDate,
          color: 'blue',
        }];
      }
    
      return [];
    });

    // Respond with the formatted events
    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    return NextResponse.json({ error: 'Failed to fetch calendar data' }, { status: 500 });

  }


};