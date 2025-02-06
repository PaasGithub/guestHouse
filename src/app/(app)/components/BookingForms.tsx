import { useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAccommodations } from "../hooks/useAccommodations";
import { BookingData } from "@/app/types/APItypes";
import AccommodationBookinForm from "./AccommodationBookingForm";


interface BookingFormProps {
    BookingType: string;
}

const BookingForms: React.FC<BookingFormProps> = ({ BookingType }) => {
    // for selected accommodation from url
    const searchParams = useSearchParams()
    // const selectedRoomId = searchParams?.get('roomType') || '1';

    // get accommodations fro dropdowns
    const { accommodations, isLoading } = useAccommodations();

    // check is submitting for loading animation
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isLoading && accommodations?.length > 0) {
            const roomFromUrl = searchParams?.get('roomType');
            console.log(accommodations[0].id);
            setFormData(prev => ({
              ...prev,
              roomType: roomFromUrl || (accommodations[0].id).toString(),
            }));
            
        }
        
        
    }, [accommodations, isLoading, searchParams]);

    useEffect(() => {
        setFormData(prev => ({
          ...prev,
          bookingType: BookingType
        }));
    }, [BookingType]);


    // form data
    const [formData, setFormData] = useState<BookingData>({
        bookingType: BookingType,
        roomType: '',
        checkIn: '',
        checkOut: '',
        eventDate: '',
        eventType: '',
        guestFirstName: '',
        guestLastName: '',
        guestEmail: '',
        specialRequests: '',
        guestPhone: '',
        accommodationGuests: 1,
        eventGuests: 1,
        startTime: '',
        endTime: '',
        services: {},
    });

    useEffect(() => {
        console.log(formData);
      }, [formData]);
      

    // function to handle changes to form fields
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          services: {
            ...prevFormData.services,
            [name]: checked, // Set true if checked, false if unchecked
          },
        }));
    };

    // function for handling submit 
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try{
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Booking Successful');
                setFormData({
                    bookingType: BookingType,
                    roomType: (accommodations[0].id).toString(),
                    checkIn: '',
                    checkOut: '',
                    eventDate: '',
                    eventType: '',
                    guestFirstName: '',
                    guestLastName: '',
                    guestEmail: '',
                    specialRequests: '',
                    guestPhone: '',
                    accommodationGuests: 1,
                    eventGuests: 1,
                    startTime: '',
                    endTime: '',
                    services: {}
                });
            } else {
                toast.error(data.error || 'Something went wrong. Please try again later.');
            }
        }
        catch (error) {
            toast.error('An error occured. Please try again later.')
            console.log(error);
        } 
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            {/*accommodation form */}
            {formData.bookingType === 'accommodation' && (
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-black dark:text-white">
                    <AccommodationBookinForm/>
                </div>
            )}

            {/* event form */}
            {formData.bookingType === 'event' && (
                
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-black dark:text-white">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h1 className="text-2xl font-bold mb-8">Book For an Event</h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                            <label htmlFor="eventType" className="block text-sm font-medium ">Event Type</label>
                            <select 
                            className="mt-1 block w-full rounded-md border dark:text-black border-gray-300 p-2"
                            onChange={handleChange}
                            name="eventType"
                            >
                                <option>Wedding</option>
                                <option>Birthday Party</option>
                                <option>Corporate Event</option>
                                <option>Other</option>
                            </select>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="eventDate" className="block text-sm font-medium">Event Date</label>
                                <div className='relative'>
                                    <input 
                                        name="eventDate"
                                        type="date" 
                                        value={formData.eventDate}
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border dark:text-black border-gray-300 p-2 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                
                            </div>
                            <div>
                                <label htmlFor="eventGuests" className="block text-sm font-medium mb-1">Number of Guests</label>
                                <input 
                                name="eventGuests"
                                type="number" 
                                min="1"
                                value={formData.eventGuests}
                                onChange={handleChange}
                                className="block w-full rounded-md border dark:text-black border-gray-300 p-3"/>
                            </div>
                            </div>

                            <div>
                            <label className="block text-sm font-medium ">Event Duration</label>
                            <div className="grid grid-cols-2 gap-4">
                                <input 
                                    name="startTime"
                                    type="time" 
                                    className="mt-1 block w-full rounded-md border dark:text-black border-gray-300 p-2 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Start Time"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                />
                                <input 
                                    name="endTime"
                                    type="time" 
                                    className="mt-1 block w-full rounded-md border dark:text-black border-gray-300 p-2 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    placeholder="End Time"
                                    value={formData.endTime}
                                    onChange={handleChange}
                                />
                            </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium ">Additional Services Needed</label>
                                <div className="mt-2 space-y-2">
                                    {['Catering', 'Decoration', 'SoundSystem'].map((service) => (
                                    <div key={service} className="flex items-center">
                                        <input
                                        type="checkbox"
                                        name={service} // Use service name as key
                                        className="h-4 w-4 text-blue-600"
                                        checked={formData.services[service] || false}
                                        onChange={handleServiceChange}
                                        />
                                        <label className="ml-2 text-sm">{service}</label>
                                    </div>
                                    ))}
                                </div>
                            </div>

                            {/* Guest Information */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Guest Information</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input
                                    name="guestFirstName"
                                    type="text"
                                    placeholder="First Name"
                                    className="w-full p-3 border rounded-lg dark:text-black"
                                    onChange={handleChange} 
                                    value={formData.guestFirstName}
                                    required
                                    />
                                    <input
                                    name="guestLastName"
                                    type="text"
                                    placeholder="Last Name"
                                    className="w-full p-3 border rounded-lg dark:text-black"
                                    onChange={handleChange}
                                    value={formData.guestLastName}
                                    required
                                    />
                                    <input
                                    name="guestEmail"
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-3 border rounded-lg dark:text-black"
                                    onChange={handleChange}
                                    value={formData.guestEmail}
                                    required
                                    />
                                    <input
                                    name="guestPhone"
                                    type="tel"
                                    placeholder="Phone"
                                    className="w-full p-3 border rounded-lg dark:text-black"
                                    onChange={handleChange}
                                    value={formData.guestPhone}
                                    required
                                    />
                                </div>
                            </div>

                            {/* Special Requests */}
                            <div>
                                <label htmlFor="specialRequests" className="block text-sm font-medium mb-2">Special Requests</label>
                                <textarea
                                    name="specialRequests"
                                    className="w-full p-3 border rounded-lg h-32 dark:text-black"
                                    placeholder="Any special requirements or requests..."
                                    onChange={handleChange}
                                    value={formData.specialRequests}
                                />
                            </div>

                            <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary dark:bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 disabled:bg-blue-300"
                            >
                                {isSubmitting ? <span className="loading-spinner"/> : 'Book Now'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    
    );
};

export default BookingForms;