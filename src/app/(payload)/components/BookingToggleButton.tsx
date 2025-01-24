'use client'
// import { CollectionConfig } from 'payload';
import React, { useState } from 'react';
import CalendarComponent from './BookingCalendarView';
import RoomCheckerComponent from './RoomCheckerComponent';
import './BookingToggleButton.css';
const BookingAdminView: React.FC = () => {
  const [activeView, setActiveView] = useState('calendar');

  // const handleToggle = (selectedView: 'calendar' | 'roomChecker') => {
  //   setView(selectedView);
  // };

  return (
  
    // <div className="flex gap-4 my-4">
    //   <div className="flex-1 border-2 border-white shadow-md rounded-lg p-4">
    //     <h3 className="text-lg font-semibold mb-4">Event Calendar</h3>
    //     <CalendarComponent />
    //   </div>
    //   <div className="flex-1 border-stone-50 shadow-md rounded-lg p-4">
    //     <h3 className="text-lg font-semibold mb-4">Room Checker</h3>
    //     <div className="max-h-[300px] overflow-y-auto">
    //       <RoomCheckerComponent />
    //     </div>
    //   </div>
    // </div>

    <div className="flex flex-col md:flex-row gap-4 my-4">
      {/* Mobile/Small Screen View with Toggle */}
      <div className="md:hidden w-full  shadow-md rounded-lg p-4">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center space-x-2 bg-gray-100 p-2 rounded-full w-fit">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeView === 'calendar'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-500 bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setActiveView('calendar')}
            >
              Calendar
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeView === 'roomChecker'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-500 bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setActiveView('roomChecker')}
            >
              RoomChecker
            </button>
          </div>

        </div>
        
        <div className="max-h-[300px] overflow-y-auto">
          {activeView === 'calendar' ? <CalendarComponent /> : <RoomCheckerComponent />}
        </div>
      </div>

      {/* Desktop/Large Screen View */}
      <div className="hidden md:flex md:w-full gap-4">
        <div className="flex-1  shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Event Calendar</h3>
          <CalendarComponent />
        </div>
        <div className="flex-1 shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Room Checker</h3>
          <div className="max-h-[300px] overflow-y-auto">
            <RoomCheckerComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingAdminView;