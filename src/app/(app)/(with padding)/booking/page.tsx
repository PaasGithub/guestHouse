"use client"
import React, { Suspense, useState } from 'react';
import { ToastContainer } from 'react-toastify';
// import BookingAcc from '../../components/BookingAcc';
import BookingForms from '../../components/BookingForms';
// import { Calendar as CalendarIcon } from 'lucide-react';
// import {accommodations} from '../../lib/data'

const BookingPage = () => {
    

    const [bookingType, setBookingType] = useState('accommodation')


    return (
        <div className='' >
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4">
                <div className="max-w-fit mx-auto mb-8 p-2 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-100">
                    <div className="flex flex-row gap-0 space-x-2">
                        <button
                        onClick={() => setBookingType('accommodation')}
                        className={`px-4 py-2 rounded-full transition-colors ${
                            bookingType === 'accommodation' ? 'bg-white dark:bg-gray-700 shadow-md' : 'hover:bg-gray-300'
                        }`}
                        >
                        Accommodation
                        </button>
                        <button 
                        onClick={() => setBookingType('event')}
                        className={`px-4 py-2 rounded-full transition-colors ${
                            bookingType === 'event' ? 'bg-white dark:bg-gray-700 shadow-md' : 'hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                        >
                        Event 
                        </button>
                        {/* <button
                        onClick={() => setBookingType('combined')}
                        className={`px-4 py-2 rounded-full transition-colors ${
                            bookingType === 'combined' ? 'bg-white dark:bg-gray-700 shadow-md' : 'hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                        >
                        Combined
                        </button> */}
                    </div>
                </div>

                <ToastContainer/>
                <Suspense fallback={<div>Loading...</div>}>
                    <BookingForms BookingType={bookingType} />
                    {/* <BookingAcc BookingType={bookingType}/> */}
                </Suspense>
                
                
                

            </div>
        </div>
    );
};

export default BookingPage;