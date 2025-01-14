'use client'
// import { CollectionConfig } from 'payload';
import React, { useState } from 'react';
import CalendarComponent from './BookingCalendarView';
import RoomCheckerComponent from './RoomCheckerComponent';
import './BookingToggleButton.css';
const BookingAdminView: React.FC = () => {
  const [view, setView] = useState<'calendar' | 'roomChecker'>('calendar');

  const handleToggle = (selectedView: 'calendar' | 'roomChecker') => {
    setView(selectedView);
  };

  return (
    <div style={{marginBottom: '20px'}}>
      {/* Toggle slider */}
        <div style={{display:'flex', justifyContent: 'center', margin: '10px'}}>
            <div className="toggle-slider">
                <button
                    className={`toggle-option ${view === 'calendar' ? 'active' : ''}`}
                    onClick={() => handleToggle('calendar')}
                >
                Event Calendar
                </button>
                <button
                    className={`toggle-option ${view === 'roomChecker' ? 'active' : ''}`}
                    onClick={() => handleToggle('roomChecker')}
                >
                Room Checker
                </button>
                <span
                className={`slider-indicator ${view === 'roomChecker' ? 'right' : 'left'}`}
                ></span>
            </div>
        </div>

      {/* Conditional Rendering */}
      {view === 'calendar' ? (
        <CalendarComponent />
      ) : (
        <RoomCheckerComponent />
      )}
    </div>
  );
};

export default BookingAdminView;