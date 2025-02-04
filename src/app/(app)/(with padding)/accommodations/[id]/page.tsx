
import RoomDetails from '@/app/(app)/components/RoomDetails';
import { getRoom } from '@/app/(app)/utils/api';


export default async function RoomPage({ params }: { params: { id: string } }) {
  const room = await getRoom(params.id);
  return <RoomDetails room={room} />;
}