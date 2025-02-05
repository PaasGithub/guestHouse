import RoomDetails from '@/app/(app)/components/RoomDetails';
import { getRoom } from '@/app/(app)/utils/api';

// Define the expected structure of `params` based on 'PageProps' properties
type RoomPageParams = {
  id: string;
};

// Define the props for the RoomPage component
// important part is defining as a promise becasue thast how PageProps defines the properties
type RoomPageProps = {
  params: Promise<RoomPageParams>; // Ensure `params` is a Promise
  
};


export default async function RoomPage({ params }: RoomPageProps) {
  // Await the `params` Promise to access its value
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Fetch the room data
  const room = await getRoom(id);

  // Render the RoomDetails component
  return <RoomDetails room={room} />;
}