"use client"
import React, { Suspense, useEffect, useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
// import {accommodations} from '../../lib/data'
import { useSearchParams } from 'next/navigation'

interface Accommodation {
    id: string;
    name: string;
    description: string;
    image: {
      url: string;
    };
    features: {
      feature: string;
    }[];
    price: number;
}

const BookingPageWrapper = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <BookingPage />
      </Suspense>
    );
};

const BookingPage = () => {
    const searchParams = useSearchParams()
    const selectedRoomId = searchParams?.get('roomType') || '1';
    // console.log("selectedRoomId: ", selectedRoomId)
    

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [accommodationGuests, setAccommodationGuests] = useState(1);
    const [eventGuests, setEventGuests] = useState(1);
    const [guestFirstName, setGuestFirstName] = useState('');
    const [guestLastName, setGuestLastName] = useState('');
    // console.log("guestName: ", guestName)
    const [guestEmail, setGuestEmail] = useState('');
    const [guestPhone, setGuestPhone] = useState('');
    const [roomType, setRoomType] = useState(selectedRoomId);
    // console.log("setRoomType: ", roomType);
    const [eventDate, setEventDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [specialRequests, setSpecialRequests] = useState('');
    const [eventType, setEventType] = useState('');


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Handle booking submission
        // console.log({ checkIn, checkOut, accommodationGuests, roomType });

        const booking = {
            bookingType,
            roomType,
            checkIn,
            checkOut,
            eventDate,
            eventType,
            guestFirstName,
            guestLastName,
            guestEmail,
            specialRequests,
            guestPhone,
            accommodationGuests,
            eventGuests,
            startTime,
            endTime,
        }
      
        console.log(booking);
        const res = await fetch('/api/bookings', {
            method: 'POST',
            body: JSON.stringify(booking)
        })

        const result = await res.json();
    
        if (res.ok) {
            // Show success message
            // Redirect to confirmation page
            console.log("Worked.")
            console.log(res);
        } else {
            // Show error (e.g., toast or pop-up)
            console.error(result.message);
            alert(result.message); // Replace with a toast notification
        }
    };

    const [bookingType, setBookingType] = useState('accommodation')

    // get acccomoodations 
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  
    useEffect(() => {
        const fetchAccommodations = async () => {
        const response = await fetch('/api/getAccommodations');
        const data = await response.json();
        setAccommodations(data.docs);
        };
        fetchAccommodations();
    }, []);

    return (
        <div className=''>
        
            <div className="min-h-screen bg-gray-50 py-12 ">
                <div className="max-w-fit mx-auto mb-8 p-2 bg-gray-100 rounded-full text-gray-600">
                    <div className="flex space-x-2">
                        <button
                        onClick={() => setBookingType('accommodation')}
                        className={`px-4 py-2 rounded-full transition-colors ${
                            bookingType === 'accommodation' ? 'bg-white shadow-md' : 'hover:bg-gray-200'
                        }`}
                        >
                        Accommodation
                        </button>
                        <button 
                        onClick={() => setBookingType('event')}
                        className={`px-4 py-2 rounded-full transition-colors ${
                            bookingType === 'event' ? 'bg-white shadow-md' : 'hover:bg-gray-200'
                        }`}
                        >
                        Event Space
                        </button>
                        <button
                        onClick={() => setBookingType('combined')}
                        className={`px-4 py-2 rounded-full transition-colors ${
                            bookingType === 'combined' ? 'bg-white shadow-md' : 'hover:bg-gray-200'
                        }`}
                        >
                        Combined
                        </button>
                    </div>
                </div>

                {/* Render different forms based on bookingType */}
                {bookingType === 'accommodation' && (
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-black">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                        <h1 className="text-2xl font-bold mb-8">Book Your Stay</h1>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Date Selection */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Check-in Date</label>
                                    <div className="relative">
                                    <input
                                        type="date"
                                        value={checkIn}
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={(e) => {
                                            setCheckIn(e.target.value);
                                            if (checkOut && checkOut < e.target.value) {
                                              setCheckOut(''); // Reset checkout if it's before new checkin
                                            }
                                        }}
                                        className="w-full p-3 border rounded-lg pr-10"
                                        required
                                    />
                                    <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Check-out Date</label>
                                    <div className="relative">
                                    <input
                                        type="date"
                                        value={checkOut}
                                        min={checkIn || new Date().toISOString().split('T')[0]}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        className="w-full p-3 border rounded-lg pr-10"
                                        required
                                    />
                                    <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Room Selection */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Room Type</label>
                                {/* <select
                                    value={roomType}
                                    onChange={(e) => setRoomType(e.target.value)}
                                    className="w-full p-3 border rounded-lg"
                                    required
                                >
                                    
                                    {Object.entries(accommodations).map(([key, { name, price }]) => (
                                    <option key={key} value={key}>
                                        {name} - ${price}/night
                                    </option>
                                    ))}
                                </select> */}
                                <select 
                                    value={roomType} 
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                    onChange={(e) => setRoomType(e.target.value)}
                                    >
                                    {accommodations.map(room => (
                                        <option key={room.id} value={room.id}>{room.name} - ${room.price}/night</option>
                                    ))}
                                </select>
                            </div>

                            {/* Number of Guests */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Number of Guests</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="4"
                                    value={accommodationGuests}
                                    onChange={(e) => setAccommodationGuests(parseInt(e.target.value))}
                                    className="w-full p-3 border rounded-lg"
                                    required
                                />
                            </div>

                            {/* Guest Information */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Guest Information</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input
                                    type="text"
                                    placeholder="First Name"
                                    className="w-full p-3 border rounded-lg"
                                    onChange={(e) => setGuestFirstName(e.target.value)} 
                                    required
                                    />
                                    <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="w-full p-3 border rounded-lg"
                                    onChange={(e) => setGuestLastName(e.target.value)}
                                    required
                                    />
                                    <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-3 border rounded-lg"
                                    onChange={(e) => setGuestEmail(e.target.value)} 
                                    required
                                    />
                                    <input
                                    type="tel"
                                    placeholder="Phone"
                                    className="w-full p-3 border rounded-lg"
                                    onChange={(e) => setGuestPhone(e.target.value)} 
                                    required
                                    />
                                </div>
                            </div>

                            {/* Special Requests */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Special Requests</label>
                                <textarea
                                    className="w-full p-3 border rounded-lg h-32"
                                    placeholder="Any special requirements or requests..."
                                    onChange={(e) => setSpecialRequests(e.target.value)}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                            type="submit"
                            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800"
                            >
                            Book Now
                            </button>
                        </form>
                        </div>
                    </div>
                )}

                {bookingType === 'event' && (
                    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg text-black">
                        <h1 className="text-2xl font-bold mb-8">Book For an Event</h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                            <label className="block text-sm font-medium text-gray-700">Event Type</label>
                            <select 
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                            onChange={(e) => setEventType(e.target.value)}
                            >
                                <option>Wedding</option>
                                <option>Birthday Party</option>
                                <option>Corporate Event</option>
                                <option>Other</option>
                            </select>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Event Date</label>
                                <div className='relative'>
                                    <input 
                                        type="date" 
                                        value={eventDate}
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={(e) => setEventDate(e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                    />
                                    <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                                </div>
                                
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Number of Guests</label>
                                <input 
                                type="number" 
                                min="1"
                                value={eventGuests}
                                onChange={(e) => setEventGuests(parseInt(e.target.value))}
                                className="block w-full rounded-md border border-gray-300 p-3"/>
                            </div>
                            </div>

                            <div>
                            <label className="block text-sm font-medium text-gray-700">Event Duration</label>
                            <div className="grid grid-cols-2 gap-4">
                                <input 
                                    type="time" 
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                    placeholder="Start Time"
                                    value={startTime}
                                    onChange={(e) => setStartTime((e.target.value))}
                                />
                                <input 
                                    type="time" 
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2" 
                                    placeholder="End Time"
                                    value={endTime}
                                    onChange={(e) => setEndTime((e.target.value))}
                                />
                            </div>
                            </div>

                            <div>
                            <label className="block text-sm font-medium text-gray-700">Additional Services Needed</label>
                            <div className="mt-2 space-y-2">
                                <div className="flex items-center">
                                <input type="checkbox" className="h-4 w-4 text-blue-600"/>
                                <label className="ml-2 text-sm text-gray-700">Catering</label>
                                </div>
                                <div className="flex items-center">
                                <input type="checkbox" className="h-4 w-4 text-blue-600"/>
                                <label className="ml-2 text-sm text-gray-700">Decoration</label>
                                </div>
                                <div className="flex items-center">
                                <input type="checkbox" className="h-4 w-4 text-blue-600"/>
                                <label className="ml-2 text-sm text-gray-700">Sound System</label>
                                </div>
                            </div>
                            </div>

                            {/* Guest Information */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Guest Information</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input
                                    type="text"
                                    placeholder="First Name"
                                    className="w-full p-3 border rounded-lg"
                                    onChange={(e) => setGuestFirstName(e.target.value)} 
                                    required
                                    />
                                    <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="w-full p-3 border rounded-lg"
                                    onChange={(e) => setGuestLastName(e.target.value)}
                                    required
                                    />
                                    <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-3 border rounded-lg"
                                    onChange={(e) => setGuestEmail(e.target.value)} 
                                    required
                                    />
                                    <input
                                    type="tel"
                                    placeholder="Phone"
                                    className="w-full p-3 border rounded-lg"
                                    onChange={(e) => setGuestPhone(e.target.value)} 
                                    required
                                    />
                                </div>
                            </div>

                            {/* Special Requests */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Special Requests</label>
                                <textarea
                                    className="w-full p-3 border rounded-lg h-32"
                                    placeholder="Any special requirements or requests..."
                                    onChange={(e) => setSpecialRequests(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800">
                            Submit Booking Request
                            </button>
                        </form>
                    </div>
                )}

                {bookingType === 'combined' && (
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-black">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h1 className="text-2xl font-bold mb-8">Book For an Accommodation and Event</h1>
                        
                            <form onSubmit={handleSubmit} className="space-y-6">
                            
                                <h2 className="text-lg font-semibold">Accommodation</h2>

                                {/* Date Selection */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Check-in Date</label>
                                        <div className="relative">
                                        <input
                                            type="date"
                                            value={checkIn}
                                            min={new Date().toISOString().split('T')[0]}
                                            onChange={(e) => {
                                                setCheckIn(e.target.value);
                                                if (checkOut && checkOut < e.target.value) {
                                                setCheckOut(''); // Reset checkout if it's before new checkin
                                                }
                                            }}
                                            className="w-full p-3 border rounded-lg pr-10"
                                            required
                                        />
                                        <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Check-out Date</label>
                                        <div className="relative">
                                        <input
                                            type="date"
                                            value={checkOut}
                                            min={checkIn || new Date().toISOString().split('T')[0]}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                            className="w-full p-3 border rounded-lg pr-10"
                                            required
                                        />
                                        <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                {/* Room Selection */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Room Type</label>
                                    {/* <select
                                        value={roomType}
                                        onChange={(e) => setRoomType(e.target.value)}
                                        className="w-full p-3 border rounded-lg"
                                        required
                                    >
                                        {Object.entries(accommodations).map(([key, { name, price }]) => (
                                        <option key={key} value={key}>
                                            {name} - ${price}/night
                                        </option>
                                        ))}
                                    </select> */}
                                    <select 
                                        value={roomType} 
                                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                        onChange={(e) => setRoomType(e.target.value)}
                                        >
                                        {accommodations.map(room => (
                                            <option key={room.id} value={room.id}>{room.name} - ${room.price}/night</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Number of Guests */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Number of Guests</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="4"
                                        value={accommodationGuests}
                                        onChange={(e) => setAccommodationGuests(parseInt(e.target.value))}
                                        className="w-full p-3 border rounded-lg"
                                        required
                                    />
                                </div>
                        

                            
                                <h2 className="text-lg font-semibold">Event</h2>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Event Type</label>
                                    <select 
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                    onChange={(e) => setEventType(e.target.value)}
                                    >
                                        <option>Wedding</option>
                                        <option>Birthday Party</option>
                                        <option>Corporate Event</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Event Date</label>
                                        <div className='relative'>
                                            <input 
                                                type="date" 
                                                value={eventDate}
                                                min={new Date().toISOString().split('T')[0]}
                                                onChange={(e) => setEventDate(e.target.value)}
                                                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                            />
                                            <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                                        </div>
                                        
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Number of Guests</label>
                                        <input 
                                        type="number" 
                                        min="1"
                                        value={eventGuests}
                                        onChange={(e) => setEventGuests(parseInt(e.target.value))}
                                        className="block w-full rounded-md border border-gray-300 p-3"/>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Event Duration</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input 
                                            type="time" 
                                            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                            placeholder="Start Time"
                                            value={startTime}
                                            onChange={(e) => setStartTime((e.target.value))}
                                        />
                                        <input 
                                            type="time" 
                                            className="mt-1 block w-full rounded-md border border-gray-300 p-2" 
                                            placeholder="End Time"
                                            value={endTime}
                                            onChange={(e) => setEndTime((e.target.value))}
                                        />
                                    </div>  
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Additional Services Needed</label>
                                    <div className="mt-2 space-y-2">
                                        <div className="flex items-center">
                                        <input type="checkbox" className="h-4 w-4 text-blue-600"/>
                                        <label className="ml-2 text-sm text-gray-700">Catering</label>
                                        </div>
                                        <div className="flex items-center">
                                        <input type="checkbox" className="h-4 w-4 text-blue-600"/>
                                        <label className="ml-2 text-sm text-gray-700">Decoration</label>
                                        </div>
                                        <div className="flex items-center">
                                        <input type="checkbox" className="h-4 w-4 text-blue-600"/>
                                        <label className="ml-2 text-sm text-gray-700">Sound System</label>
                                        </div>
                                    </div>          
                                </div>
                            

                                {/* Guest Information */}
                                <div className="space-y-4">
                                    <h2 className="text-lg font-semibold">Guest Information</h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <input
                                        type="text"
                                        placeholder="First Name"
                                        className="w-full p-3 border rounded-lg"
                                        onChange={(e) => setGuestFirstName(e.target.value)} 
                                        required
                                        />
                                        <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="w-full p-3 border rounded-lg"
                                        onChange={(e) => setGuestLastName(e.target.value)}
                                        required
                                        />
                                        <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full p-3 border rounded-lg"
                                        onChange={(e) => setGuestEmail(e.target.value)} 
                                        required
                                        />
                                        <input
                                        type="tel"
                                        placeholder="Phone"
                                        className="w-full p-3 border rounded-lg"
                                        onChange={(e) => setGuestPhone(e.target.value)} 
                                        required
                                        />
                                    </div>
                                </div>

                                {/* Special Requests */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Special Requests</label>
                                    <textarea
                                        className="w-full p-3 border rounded-lg h-32"
                                        placeholder="Any special requirements or requests..."
                                        onChange={(e) => setSpecialRequests(e.target.value)}
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800"
                                >
                                Book Now
                                </button>

                            </form>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default BookingPageWrapper;