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

// Helper to calculate date range
// function getDateRange(start: string, end: string): string[] {
//   const startDate = new Date(start);
//   const endDate = new Date(end);
//   const dates: string[] = [];

//   while (startDate < endDate) {
//     startDate.setDate(startDate.getDate() + 1); // Increment by 1 day
//     if (startDate < endDate) {
//       dates.push(startDate.toISOString().split('T')[0]);
//     }
//   }

//   return dates;
// }

export async function GET() {
  try {
    const payload = await getPayload({ config: payloadConfig });

    // Fetch bookings from Payload CMS
    const bookings = await payload.find({
      collection: 'bookings',
    });

    // Transform bookings into calendar events
    const events: CalendarEvent[] = bookings.docs.flatMap((booking: Booking) => {
      const { bookingType, accommodation, event } = booking;

      const eventList: CalendarEvent[] = [];

      // if (bookingType === 'accommodation' && accommodation?.checkIn) {
      //   const checkInEvent: CalendarEvent = {
      //     date: accommodation.checkIn,
      //     color: 'orange',
      //   };
      //   eventList.push(checkInEvent);

      //   if (accommodation.checkOut) {
      //     const checkOutEvent: CalendarEvent = {
      //       date: accommodation.checkOut,
      //       color: 'orange',
      //     };
      //     eventList.push(checkOutEvent);

      //     // Add faded dates in-between
      //     const fadedDates = getDateRange(accommodation.checkIn, accommodation.checkOut);
      //     fadedDates.forEach((date) => {
      //       eventList.push({ date, color: 'faded-orange' });
      //     });
      //   }
      // }

      if (bookingType === 'event' && event?.eventDate) {
        eventList.push({
          date: event.eventDate,
          color: 'blue',
        });
      }

      if (bookingType === 'combined' && accommodation?.checkIn && event?.eventDate) {
        // const checkInEvent: CalendarEvent = {
        //   date: accommodation.checkIn,
        //   color: 'combine',
        // };
        // eventList.push(checkInEvent);

        if (accommodation.checkOut) {
          // const checkOutEvent: CalendarEvent = {
          //   date: accommodation.checkOut,
          //   color: 'combine',
          // };
          // eventList.push(checkOutEvent);

          // Add faded dates in-between
          // const fadedDates = getDateRange(accommodation.checkIn, accommodation.checkOut);
          // fadedDates.forEach((date) => {
          //   eventList.push({ date, color: 'faded-combine' });
          // });
        }

        eventList.push({
          date: event.eventDate,
          color: 'blue',
        });
      }

      return eventList;
    });

    // Respond with the formatted events
    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    return NextResponse.json({ error: 'Failed to fetch calendar data' }, { status: 500 });
  }
}