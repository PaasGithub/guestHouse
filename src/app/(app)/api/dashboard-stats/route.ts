import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import payloadConfig from '@payload-config';

export async function GET() {
  try {
    const payload = await getPayload({ config: payloadConfig });

    // Fetch total bookings
    const totalBookings = await payload.find({
      collection: 'bookings',
      limit: 0,
    });

    // Fetch upcoming bookings
    const upcomingBookings = await payload.find({
      collection: 'bookings',
      where: {
        'accommodation.checkIn': {
          greater_than: new Date().toISOString(),
        },
      },
      limit: 0,
    });

    // Fetch today's check-ins
    const today = new Date().toISOString().split('T')[0];
    const todayCheckIns = await payload.find({
      collection: 'bookings',
      where: {
        'accommodation.checkIn': {
          equals: today,
        },
      },
      limit: 0,
    });

    return NextResponse.json({
      totalBookings: totalBookings.totalDocs,
      upcomingBookings: upcomingBookings.totalDocs,
      todayCheckIns: todayCheckIns.totalDocs,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}