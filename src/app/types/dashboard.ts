export interface BookingStatsType {
    totalBookings: number[];
    bookingsByType: {
      total: {
        accommodation: number;
        event: number;
        combined: number;
      };
      monthlyTrends: {
        accommodation: number[];
        event: number[];
        combined: number[];
      };
    };
    monthlyRevenue: number[];
  }

  export interface DashboardAccommodation {
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
    totalUnitsAvailable: number;
  }
 
export interface Booking {
    bookingType: string;
    accommodation: {
        room: {id: number}; // Accommodation ID
        checkIn: string; // Date string
        checkOut: string; // Date string
    };
    status: 'pending' | 'confirmed' | 'cancelled';
}