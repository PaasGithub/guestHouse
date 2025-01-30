export interface BookingData {
    bookingType: 'accommodation' | 'event' | 'combined' | string;
    roomType: string;
    checkIn: string;
    checkOut: string;
    eventDate: string;
    eventType: string;
    guestFirstName: string;
    guestLastName: string;
    guestEmail: string;
    guestPhone: string;
    specialRequests: string;
    accommodationGuests: number | string;
    eventGuests: number;
    startTime: string;
    endTime: string;
    services: Record<string, boolean>;
}

export interface BookingsLikeType {
    bookingType: 'accommodation' | 'event' | 'combined' ;
    roomType: string;
    checkIn: string;
    checkOut: string;
    eventDate: string;
    eventType: 'Wedding' | 'Birthday Party' | 'Corporate Event' | 'Other';
    guestFirstName: string;
    guestLastName: string;
    guestEmail: string;
    guestPhone: string;
    specialRequests: string;
    accommodationGuests: string;
    eventGuests: number;
    startTime: string;
    endTime: string;
    services: ('Catering' | 'Decoration' | 'Sound System')[] | null;
    status: "cancelled" | "pending" | "confirmed" | null | undefined;
}