
import { getPayload } from "payload";
import payloadConfig from "@payload-config";
import { Accommodation } from "../../../../payload-types";

export async function getRoom(id: string): Promise<Accommodation> {
    const payload = await getPayload({ config: payloadConfig });
    const room =  await payload.findByID({
        collection: 'accommodations',
        id: id
    });
    console.log("Room data: ");
    console.log(room);
    return room; 
}

export async function getAllRooms() {
    const payload = await getPayload({ config: payloadConfig });
    return await payload.find({
        collection: 'accommodations'
    });
}