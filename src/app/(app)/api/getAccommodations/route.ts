import { getPayload } from 'payload';
// import { Accommodation } from '../../../../../payload-types';
import payloadConfig from '@payload-config';
import { NextResponse } from 'next/server';

// export default async function handler(req: string, res: { json: (arg0: PaginatedDocs<Accommodation>) => void; }) {
//   const payload = await getPayload({ config: payloadConfig });
//   console.log("Here is the accommodations.");
//   const accommodations = await payload.find({
//     collection: 'accommodations',
//   });
//   res.json(accommodations);
// }

export async function GET() {
    try {
        const payload = await getPayload({ config: payloadConfig });
    
        // Fetch accommodations from Payload CMS
        const accommodations = await payload.find({
          collection: 'accommodations',
        });

        // console.log(accommodations);

        return NextResponse.json(accommodations);

    }catch (error) {
        console.error('Error fetching accommodations data:', error);
        return NextResponse.json({ error: 'Failed to fetch accommodation data' }, { status: 500 });
    
    }

}