import { getPayload } from 'payload';
import payloadConfig from '@payload-config';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const payload = await getPayload({ config: payloadConfig });
    
        // Fetch bookings from Payload CMS
        const bookings = await payload.find({
          collection: 'bookings',
        });

        // console.log(bookings);

        return NextResponse.json(bookings);

    }catch (error) {
        console.error('Error fetching bookings data:', error);
        return NextResponse.json({ error: 'Failed to fetch booking data' }, { status: 500 });
    
    }

}