'use client';
import { useState } from "react";

const RoomCheckerComponent: React.FC = () => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [availableRooms, setAvailableRooms] = useState([]);

    const checkAvailability = async () => {
        try {
            //   const { data: accommodations, error } = await payload.client.fetch('/api/accommodations', {
            //     method: 'GET',
            //   });
            const response = await fetch('/api/getAccommodations');
            const data = await response.json();
            const accommodations = data.docs;
        
            const available = accommodations.filter((accommodation: any) => {
                // Logic to check availability using bookings or availability data
                return true; // Replace with your actual availability checking logic
            });
        
            setAvailableRooms(available);
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