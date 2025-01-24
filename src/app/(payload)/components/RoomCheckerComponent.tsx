'use client';
import { Accommodation } from "@/app/types/dashboard";
import { useState } from "react";
import { Booking } from "../../../../payload-types";
import { NextResponse } from "next/server";
const RoomCheckerComponent: React.FC = () => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [availableRooms, setAvailableRooms] =  useState<Accommodation[]>([]);

    const checkAvailability = async () => {
        if (!checkIn || !checkOut) {
            alert("Please select both check-in and check-out dates.");
            return;
        }
    
        try {
            // Fetch accommodations
            const accommodationsResponse = await fetch('/api/getAccommodations');
            const { docs: accommodations }: { docs: Accommodation[] } = await accommodationsResponse.json();
            
    
            // Fetch bookings
            const bookingsResponse = await fetch('/api/getBookings');
            const { docs: bookings }: { docs: Booking[] } = await bookingsResponse.json();
    
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            if(!bookings){ return NextResponse.json({ error: 'Failed to fetch bookings data' }, { status: 500 });}
            const available = accommodations.filter((accommodation) => {
                // console.log(`Accommodation: ${accommodation.totalUnitsAvailable}`);
                const totalUnits = accommodation.totalUnitsAvailable;
    
                // Filter bookings for this accommodation
                const accommodationBookings = bookings.filter(
                    (booking) =>
                      booking.bookingType === 'accommodation' &&
                      booking.accommodation && // Ensure accommodation is defined
                      booking.accommodation.room.id === accommodation.id &&
                      booking.status !== 'cancelled' &&
                      new Date(booking.accommodation.checkIn) < checkOutDate &&
                      new Date(booking.accommodation.checkOut) > checkInDate
                );
                  
    
                // Calculate units left
                const unitsLeft = totalUnits - accommodationBookings.length;
                // console.log(`Accommodation Bookings length: ${accommodationBookings.length}`);
                // console.log(`Units left for room ${accommodation.id}: ${unitsLeft} from ${checkInDate} to ${checkOutDate}`);
    
                return unitsLeft > 0;
            });
    
            setAvailableRooms(available);
            console.log(available);
        } catch (err) {
            console.error('Error checking availability:', err);
        }
    };
    
    
    return (
        // <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',gap: '20px', margin: '30px'}}>

        //     <div style={{ display: 'flex',  flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '20px', width: '100%', }}>

        //         <div style={{flex: '1 1 150px', minWidth: '150px'  }}>
        //             <label style={{ 
        //                 display: 'block', 
        //                 marginBottom: '5px', 
        //                 fontWeight: 'bold' 
        //             }}>
        //                 Check-In Date:
        //             </label>
        //             <input
        //                 type="date"
        //                 value={checkIn}
        //                 onChange={(e) => setCheckIn(e.target.value)}
        //                 style={{width: '100%', padding: '10px'}}
        //             />
        //         </div>

        //         <div style={{flex: '1 1 150px', minWidth: '150px' }}>
        //             <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
        //                 Check-Out Date: 
        //             </label>
        //             <input
        //                 type="date"
        //                 value={checkOut}
        //                 onChange={(e) => setCheckOut(e.target.value)}
        //                 className="w-full p-2 border border-gray-300 rounded"
        //                 style={{width: '100%', padding: '10px'}}
        //             />
        //         </div>

        //         <div style={{margin: '10px'}}>
        //             <button
        //                 onClick={checkAvailability}
        //                 style={{padding: '10px 20px', borderRadius: '5px', cursor: 'pointer'}}
        //             >
        //                 Check Availability
        //             </button>
        //         </div>
        //     </div>

        //     <div>
        //         {availableRooms.length > 0 ? (
        //             <div className="mt-4">
        //             <h2 className="font-bold text-lg">Available Rooms:</h2>
        //             <ul className="space-y-2">
        //                 {availableRooms.map((room: any) => (
        //                 <li key={room.id} className="border p-2 rounded">
        //                     <span className="font-semibold">{room.name}</span>
        //                 </li>
        //                 ))}
        //             </ul>
        //             </div>
        //         ) : (
        //             <p className="mt-4 text-gray-500">No available rooms for the selected dates.</p>
        //         )}
        //     </div>

      
        // </div>
        <div className="flex flex-col items-center gap-5 m-7">
            <div className="flex flex-col w-full max-w-md gap-4">
            <div>
                <label className="block mb-2 font-bold">Check-In Date:</label>
                <input 
                type="date" 
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div>
                <label className="block mb-2 font-bold">Check-Out Date:</label>
                <input 
                type="date" 
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="flex justify-center">
                <button 
                onClick={checkAvailability}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                Check Availability
                </button>
            </div>
            </div>

            <div className="w-full max-w-md max-h-[300px] overflow-y-auto">
            {availableRooms.length > 0 ? (
                <div>
                <h2 className="text-lg font-bold mb-2">Available Rooms:</h2>
                <ul className="space-y-2">
                    {availableRooms.map((room) => (
                    <li key={room.id} className="border p-2 rounded">
                        <span className="font-semibold">{room.name}</span>
                    </li>
                    ))}
                </ul>
                </div>
            ) : (
                <p className="text-gray-500">No available rooms for the selected dates.</p>
            )}
            </div>
        </div>
    );
};

export default RoomCheckerComponent;