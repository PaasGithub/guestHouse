import { BookingsLikeType } from "@/app/types/APItypes";
import payloadConfig from "@payload-config";
import { getPayload } from "payload";

const payload = await getPayload({ config: payloadConfig });


export async function checkRoomAvailability(roomId: string, checkIn: Date, checkOut: Date): Promise<boolean> {
    try {

        // console.log("Checking room id: " + roomId);
      
        // Fetch accommodation details
        const accommodation = await payload.findByID({
        collection: 'accommodations',
        id: roomId,
        });

        // console.log("bookingutils accommoadtions:");
        // console.log(accommodation);
        if (!accommodation) {
        throw new Error('Accommodation not found');
        }

        // Fetch overlapping bookings
        const overlappingBookings = await payload.find({
        collection: 'bookings',
        where: {
            and: [
            { 'accommodation.room': { equals: roomId } },
            { status: { not_equals: 'cancelled' } },
            {
                or: [
                {
                    and: [
                    { 'accommodation.checkIn': { less_than_equal: checkOut } },
                    { 'accommodation.checkOut': { greater_than_equal: checkIn } },
                    ],
                },
                ],
            },
            ],
        },
        });

        // console.log("overlapping bookings", overlappingBookings)

        // Calculate units left
        const unitsLeft = accommodation.totalUnitsAvailable - (overlappingBookings?.docs?.length || 0);
        // console.log("units left", unitsLeft);

        return unitsLeft > 0;
    } catch (error) {
        console.error('Error checking room availability:', error);
        throw new Error('Failed to check room availability');
    }
  }
  
export async function checkEventAvailability(eventDate: Date): Promise<boolean> {
      try {

        const existingBookings = await payload.find({
            collection: 'bookings',
            where: {
                and: [
                    { 'event.eventDate': { equals: eventDate } },
                    { status: { not_equals: 'cancelled' } },
                ]
            }
        });
    
        // Return true if no overlapping bookings exist
        return existingBookings?.docs?.length === 0;
      } catch (error) {
        console.error('Error checking event availability:', error);
        throw new Error('Failed to check event availability');
      }
    }
  
export async function createBooking(bookingData: BookingsLikeType) {
      try {
        // const response = await payloadFetch('/api/bookings', {
        //   method: 'POST',
        //   body: JSON.stringify(bookingData),
        // });
        // console.log("booking data:");
        // console.log(parseInt(bookingData?.roomType));

        const response = await payload.create({
            collection: "bookings",
            data: {
              bookingType: bookingData.bookingType,
              accommodation: 
                ["accommodation", "combined"].includes(bookingData.bookingType)
                  ? {
                      checkIn: bookingData?.checkIn,
                      checkOut: bookingData?.checkOut,
                      room: parseInt(bookingData?.roomType),
                      guests: parseInt(bookingData?.accommodationGuests),
                    }
                  : undefined,
              event: 
                ["event", "combined"].includes(bookingData.bookingType)
                  ? {
                      eventType: bookingData?.eventType,
                      eventDate: bookingData?.eventDate,
                      startTime: bookingData?.startTime,
                      endTime: bookingData?.endTime || null,
                      guests: bookingData?.eventGuests,
                      services: bookingData?.services || [],
                    }
                  : undefined,
              guestInfo: {
                firstName: bookingData.guestFirstName,
                lastName: bookingData.guestLastName,
                email: bookingData.guestEmail,
                phone: bookingData.guestPhone,
              },
              specialRequests: bookingData.specialRequests || null,
              status: bookingData.status || "pending",
            },
          });
    
        if (!response) {
          throw new Error('Failed to create booking');
          
        }
    
        return response;
      } catch (error) {
        console.error('Error creating booking:', error);
        // console.log(error.data);
        // console.log(error.cause);
        throw new Error('Failed to create booking');
        
      }
    }