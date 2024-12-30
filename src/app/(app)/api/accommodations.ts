import payload, { PaginatedDocs } from 'payload';
import { Accommodation } from '../../../../payload-types';

export default async function handler(req: any, res: { json: (arg0: PaginatedDocs<Accommodation>) => void; }) {
  const accommodations = await payload.find({
    collection: 'accommodations',
  });
  res.json(accommodations);
}