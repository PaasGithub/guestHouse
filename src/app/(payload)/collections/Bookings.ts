
import { CollectionConfig } from 'payload';
// import BookingAdminView from '../components/BookingToggleButton';
// import React from 'react';

// const CalComponent = React.lazy(() => import('../components/BookingCalendarView'));

const Booking: CollectionConfig = {
 slug: 'bookings',

 fields: [
   {
     name: 'bookingType',
     type: 'select',
     required: true,
     options: [
       { label: 'Accommodation', value: 'accommodation' },
       { label: 'Event', value: 'event' },
       { label: 'Combined', value: 'combined' }
     ],
     
   },
   {
     name: 'accommodation',
     type: 'group',
     admin: {
       condition: (data) => ['accommodation', 'combined'].includes(data.bookingType)
     },
     fields: [
       {
         name: 'checkIn',
         type: 'date',
         admin: {
            date:{
                pickerAppearance: 'dayOnly',
                displayFormat: 'd MMM yyy',
                minDate: new Date(),
            },
         },
         required: true,
       },
       {
        name: 'checkOut',
        type: 'date',
        required: true,
        admin: {
            date: {
                pickerAppearance: 'dayOnly',
                displayFormat: 'd MMM yyy',
                minDate: new Date(),
                // validateInput: async ({ value, data }) => {
                //     if (data.accommodation?.checkIn && value < data.accommodation.checkIn) {
                //         return 'Check-out date must be after check-in date';
                //     }
                //     return true;
                // },
            },
        },
       },
       {
        name: 'room',
        type: 'relationship',
        relationTo: 'accommodations',
        required: true,
       },
       {
         name: 'guests',
         type: 'number',
         min: 1,
         max: 4,
       },
       {
        name: 'totalPrice',
        type: 'number',
        required: true,
       }
     ]
   },
   {
     name: 'event',
     type: 'group',
     admin: {
       condition: (data) => ['event', 'combined'].includes(data.bookingType)
     },
     fields: [
       {
         name: 'eventType',
         type: 'select',
         options: ['Wedding', 'Birthday Party', 'Corporate Event', 'Other'],
         required: true,
       },
       {
         name: 'eventDate',
         type: 'date',
         required: true,
         admin: {
            date:{
                pickerAppearance: 'dayOnly',
                displayFormat: 'd MMM yyy',
                minDate: new Date(),
            },
         },
       },
       {
         name: 'startTime',
         type: 'text',
         required: true,
       },
       {
         name: 'endTime',
         type: 'text',
       },
       {
         name: 'guests',
         type: 'number',
         min: 1,
         required: true,
       },
       {
         name: 'services',
         type: 'select',
         hasMany: true,
         options: ['Catering', 'Decoration', 'Sound System']
       }
     ]
   },
   {
        name: 'guestInfo',
        type: 'group',
        fields: [
            {
                name: 'firstName',
                type: 'text',
                required: true,
            },
            {
                name: 'lastName', 
                type: 'text',
                required: true,
            },
            {
                name: 'email',
                type: 'email',
                required: true,
            },
            {
                name: 'phone',
                type: 'text',
                required: true,
            }
        ],
   },
   {
     name: 'specialRequests',
     type: 'textarea',
   },
   {
     name: 'status',
     type: 'select',
     defaultValue: 'pending',
     options: [
       'pending',
       'confirmed', 
       'cancelled'
     ]
   }
 ],
 admin: {
    // components: {
    //   // beforeList: CalendarComponent,
    //   beforeList: BookingAdminView,
    // },
    defaultColumns: [
      'guestInfo',
      'bookingType',
      'accommodation',
      // 'guestInfofirstName',
    ],
  },

};

export default Booking;