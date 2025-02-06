import React, { ChangeEvent, useEffect, useState } from 'react';
import { fetchAvailableRooms } from '../hooks/fetchAvailableAccommodations';
import { Accommodation } from '../../../../payload-types';
import { AccommodationsBookingData } from '@/app/types/APItypes';
import { toast } from 'react-toastify';

// interface Accommodation {
//   id: number;
//   name: string;
//   totalUnitsAvailable: number;
//   image: {url: string};
//   price: number;
// }

const AccommodationBookingForm: React.FC = () => {
  const [step, setStep] = useState<number>(1); // Track current step

  const [availableRooms, setAvailableRooms] = useState<
    { accommodation: Accommodation; unitsLeft: number }[]
  >([]);
  const [selectedRoom, setSelectedRoom] = useState<
  { accommodation: Accommodation; unitsLeft: number }>();
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const handleCheckAvailability = async () => {
    setLoading(true);
    try{
      const rooms = await fetchAvailableRooms(formData.checkIn, formData.checkOut);
      setAvailableRooms(rooms);
      setLoading(false);
      setStep(2); // Move to step 2
    }catch(error){
      setLoading(false);

        // Check if the error is the specific "missing dates" error
      if (error instanceof Error && error.message === 'MISSING_DATES') {
          toast.error('Please select both check-in and check-out dates.'); // Custom message
      } else {
          toast.error('An error occurred. Please try again later.'); // Default message
          console.error(error); // Log the error for debugging
      }
    }
  };

  const handleSelectRoom = (room: Accommodation) => {
    // setSelectedRoom(room);
    // console.log("Room price:", room.price);
    // console.log("Check in: ",formData.checkIn);
    // console.log("Checkout: ", formData.checkOut);

    const totalPriceOwed = calculatePrice(room.price, formData.checkIn, formData.checkOut);
    const roomID = (room.id).toString();
    setFormData((prev) => ({ ...prev, 'roomType': roomID, 'accommodationTotalPrice':  totalPriceOwed}));
    setStep(3); // Move to step 3
  };

  const calculatePrice = (ppn: number, checkIn: string, checkOut: string) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // calculate difference in milliesecnds 
    const timeDifference = checkOutDate.getTime() - checkInDate.getTime()
    
    // Convert the time difference from milliseconds to days
    const numOfNights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    const totalPrice = numOfNights * ppn; //ppn is price per night

    // console.log("Total Price: ", totalPrice, " Nights: ", numOfNights);

    return totalPrice;
  }

  const handleBookRoom = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success('Booking Successful'); // Show success message
        // Reset form data after successful booking
        setFormData({
          bookingType: 'accommodation',
          roomType: '',
          checkIn: '',
          checkOut: '',
          guestFirstName: '',
          guestLastName: '',
          guestEmail: '',
          specialRequests: '',
          guestPhone: '',
          accommodationGuests: 1,
          accommodationTotalPrice: 0,
        });
        setLoading(false);
        setStep(1); // Optionally, reset to the first step
      } else {
        toast.error(data.error || 'Something went wrong. Please try again later.'); // Show error message
        setLoading(false);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.'); // Show error message
      console.error(error); // Log the error for debugging
      setLoading(false);
    }
  };


  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1); // Go back to the previous step
    }
  };

    const [formData, setFormData] = useState<AccommodationsBookingData>({
        bookingType: 'accommodation',
        roomType: '',
        checkIn: '',
        checkOut: '',
        guestFirstName: '',
        guestLastName: '',
        guestEmail: '',
        specialRequests: '',
        guestPhone: '',
        accommodationGuests: 1,
        accommodationTotalPrice: 0,
    });

    // function to handle changes to form fields
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
};

//   useEffect(() => {
//     console.log(availableRooms);
//   }, [availableRooms]);

  useEffect(()=>{
    console.log("FormData:");
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    if (formData.roomType) {
      const roomId = parseInt(formData.roomType, 10); // Convert roomType to a number
      const sRoom = availableRooms.find(room => room.accommodation.id === roomId);
      setSelectedRoom(sRoom);
    //   console.log("Selected Room:");
    //   console.log(sRoom);
    //   setSelectedRoom(sRoom); 
    }
  }, [formData.roomType, availableRooms]);

  return (
    <div className="flex items-center justify-center ">
      <div className="p-6 w-full max-w-3xl">
        {/* Step 1: Check Availability */}
        {step === 1 && (
            <div className="space-y-6">
                {/* <h1 className="text-2xl font-bold mb-4">Check Availability</h1> */}

                <div className='space-y-2'>
                    <label htmlFor='checkIn' className="block text-md">Check-in Date</label>
                    <input
                        id="AccommCheckInDate"
                        name="checkIn"
                        type="date"
                        value={formData.checkIn}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg dark:text-black appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder='dd mm yyyy'
                    />
                </div>

                <div className='space-y-2'>
                    <label htmlFor='checkOut' className="block text-md">Check-out Date</label>
                    <input
                        id="AccommCheckOutDate"
                        name="checkOut"
                        type="date"
                        value={formData.checkOut}
                        min={formData.checkIn || new Date().toISOString().split('T')[0]}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg dark:text-black appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder='dd mm yyyy'
                    />
                </div>

                <div className='space-y-2'>
                    <label htmlFor="accommodationGuests" className="block text-md">Number of Guests</label>
                    <input
                        name="accommodationGuests"
                        type="number"
                        value={formData.accommodationGuests}
                        onChange={handleChange}
                        min="1"
                        className="w-full p-3 border rounded-lg  dark:text-black"
                        placeholder="Number of Guests"
                    />
                </div>

                <button
                onClick={handleCheckAvailability}
                disabled={loading}
                className="w-full bg-primary text-white p-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
                >
                {loading ? 'Checking...' : 'Check Availability'}
                </button>
            </div>
        )}

        {/* Step 2: Available Rooms */}
        {step === 2 && (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold mb-4">Available Rooms</h1>
            {availableRooms.map((room) => (
              <div
                key={room.accommodation.id}
                className="p-4 border border-gray-300 rounded"
              >
                <h3 className="font-semibold">{room.accommodation.name}</h3>
                <p className="text-sm text-gray-600">
                  Units Left: {room.unitsLeft}
                </p>
                <button
                  onClick={() => handleSelectRoom((room.accommodation))}
                  className="w-full mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Select
                </button>
              </div>
            ))}
            
            <button
              onClick={handleBack}
              className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Back
            </button>
          </div>
        )}

        {/* Step 3: Guest Information */}
        {step === 3 && formData.roomType && (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold mb-4">Guest Information</h1>
            <div className="p-4 border border-gray-300 rounded">
              <h3 className="font-semibold">Selected Room</h3>
              <input
                type="text"
                value={selectedRoom ? selectedRoom.accommodation.name : ''} 
                disabled
                className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              />
            </div>
            <input
                id = "FirstName"
                name = "guestFirstName"
                type="text"
                placeholder="E.g. John"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleChange} 
                value={formData.guestFirstName}
            />
            <input
                id = 'LastName'
                name = 'guestLastName'
                type="text"
                placeholder="E.g. Doe"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleChange}
                value={formData.guestLastName}
            />
            <input
                id = "Email"
                name = "guestEmail"
                type="email"
                placeholder="E.g. JDoe@email.com"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleChange} 
                value={formData.guestEmail}
            />
            <input
                id = "PhoneNumber"
                name = "guestPhone"
                type="tel"
                placeholder="E.g. 0201234567"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleChange}
                value={formData.guestPhone}
            />
            <textarea
                id = "SpecialRequests"
                name = "specialRequests"
                placeholder="Special Requests"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleChange}
                value={formData.specialRequests}
            />
            <button
              onClick={handleBookRoom}
              disabled={loading}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              Book Now
            </button>
            <button
              onClick={handleBack}
              className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccommodationBookingForm;