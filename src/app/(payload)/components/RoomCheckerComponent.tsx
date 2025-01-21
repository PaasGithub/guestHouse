'use client';
import { useState } from "react";
const RoomCheckerComponent: React.FC = () => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [availableRooms, setAvailableRooms] =  useState<Accommodation[]>([]);

    // const checkAvailability = async () => {
    //     try {
    //         //   const { data: accommodations, error } = await payload.client.fetch('/api/accommodations', {
    //         //     method: 'GET',
    //         //   });
    //         const response = await fetch('/api/getAccommodations');
    //         const data = await response.json();
    //         const accommodations = data.docs;
        
    //         const available = accommodations.filter((accommodation: any) => {
    //             // Logic to check availability using bookings or availability data
    //             return true; // Replace with your actual availability checking logic
    //         });
        
    //         setAvailableRooms(available);
    //     } catch (err) {
    //         console.error('Error checking availability:', err);
    //     }
    // };

    interface Accommodation {
        id: string;
        name: string;
        totalUnitsAvailable: number;
    }
    
    // interface Booking {
    //     accommodation_room_id: string; // Accommodation ID
    //     accommodation_check_out: string; // Date string
    //     accommodation_check_in: string; // Date string
    //     status: 'pending' | 'confirmed' | 'cancelled';
    // }
    
    interface Booking {
        bookingType: string;
        accommodation: {
            room: {id: string}; // Accommodation ID
            checkIn: string; // Date string
            checkOut: string; // Date string
        };
        status: 'pending' | 'confirmed' | 'cancelled';
    }

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
    
            const available = accommodations.filter((accommodation) => {
                // console.log(`Accommodation: ${accommodation.totalUnitsAvailable}`);
                const totalUnits = accommodation.totalUnitsAvailable;
    
                // Filter bookings for this accommodation
                const accommodationBookings = bookings.filter(
                    (booking) =>
                        // console.log(`booking check in/: ${booking.accommodation.room.id}`),
                        booking.bookingType == "accommodation" && booking.accommodation.room.id === accommodation.id &&
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',gap: '20px', margin: '30px'}}>

            <div style={{ display: 'flex',  flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '20px', width: '100%', }}>

                <div style={{flex: '1 1 150px', minWidth: '150px'  }}>
                    <label style={{ 
                        display: 'block', 
                        marginBottom: '5px', 
                        fontWeight: 'bold' 
                    }}>
                        Check-In Date:
                    </label>
                    <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        style={{width: '100%', padding: '10px'}}
                    />
                </div>

                <div style={{flex: '1 1 150px', minWidth: '150px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Check-Out Date: 
                    </label>
                    <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        style={{width: '100%', padding: '10px'}}
                    />
                </div>

                <div style={{margin: '10px'}}>
                    <button
                        onClick={checkAvailability}
                        style={{padding: '10px 20px', borderRadius: '5px', cursor: 'pointer'}}
                    >
                        Check Availability
                    </button>
                </div>
            </div>

            <div>
                {availableRooms.length > 0 ? (
                    <div className="mt-4">
                    <h2 className="font-bold text-lg">Available Rooms:</h2>
                    <ul className="space-y-2">
                        {availableRooms.map((room: any) => (
                        <li key={room.id} className="border p-2 rounded">
                            <span className="font-semibold">{room.name}</span>
                        </li>
                        ))}
                    </ul>
                    </div>
                ) : (
                    <p className="mt-4 text-gray-500">No available rooms for the selected dates.</p>
                )}
            </div>

      
        </div>
    );
};

export default RoomCheckerComponent;