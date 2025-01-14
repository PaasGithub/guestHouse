'use client';

// import { CustomComponent } from 'payload';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './CalendarComponent.css';
type Event = {
  date: string; // ISO 8601 string, e.g., "2024-01-01"
  color: string; // CSS color, e.g., "red", "#FF0000"
};

const CalendarComponent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Load CSS and set events
    // const loadCSS = async () => {
    //   await import('./CalendarComponent.css');
    // };

    // loadCSS();

    // const dummyEvents: Event[] = [
    //   { date: '2024-01-01', color: 'orange' },
    //   { date: '2024-01-15', color: 'blue' },
    //   { date: '2024-01-20', color: 'green' },
    //   { date: '2024-01-22', color: 'combine' },
    //   { date: '2024-02-01', color: 'red' },
    // ];
    // setEvents(dummyEvents);

    const fetchBookings = async () => {
      const response = await fetch('/api/calendar'); // Adjust API path if necessary
      const data = await response.json();
      
      setEvents(data.events);
    };

    fetchBookings();
  }, []);

  const getTileClassName = ({ date }: { date: Date }) => {
    if (events) {
      const event = events.find(
        (event) => new Date(event.date).toDateString() === date.toDateString()
      );
      if (event) {
        return `calendar-event-${event.color}`;
      }
      return '';
    }
    return '';
  };

  return (
    <Calendar
      tileClassName={getTileClassName}
      onChange={() => {}} // Add logic for date selection if needed
      formatDay={(locale, date) => date.getDate().toString().padStart(2, '0')}
    />
  );
};

export default CalendarComponent;
