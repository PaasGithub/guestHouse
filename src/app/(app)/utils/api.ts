
import { getPayload } from "payload";
import payloadConfig from "@payload-config";

export async function getRoom(id: string) {
    const payload = await getPayload({ config: payloadConfig });
    return await payload.findByID({
        collection: 'accommodations',
        id: id
    });
}

export async function getAllRooms() {
    const payload = await getPayload({ config: payloadConfig });
    return await payload.find({
        collection: 'accommodations'
    });
}