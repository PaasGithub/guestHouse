import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import payloadConfig from '@payload-config';

const payload = await getPayload({ config: payloadConfig });
// export async function GET() {
//   try {
    

//     // Fetch total bookings
//     const totalBookings = await payload.find({
//       collection: 'bookings',
//       limit: 0,
//     });

//     //fetch booking by type 
//     // const bookingsByType = await payload.find({

//     // });

//     // Fetch upcoming bookings
//     const upcomingBookings = await payload.find({
//       collection: 'bookings',
//       where: {
//         'accommodation.checkIn': {
//           greater_than: new Date().toISOString(),
//         },
//         'bookingType':{
//             equals: 'accommodation',
//         },
//       },
//       limit: 0,
//     });
//     console.log(upcomingBookings)

//     // Fetch today's check-ins
//     const today = new Date().toISOString().split('T')[0];
//     const todayCheckIns = await payload.find({
//       collection: 'bookings',
//       where: {
//         'accommodation.checkIn': {
//           equals: today,
//         },
//       },
//       limit: 0,
//     });

//     return NextResponse.json({
//       totalBookings: totalBookings.totalDocs,
//       upcomingBookings: upcomingBookings.totalDocs,
//       todayCheckIns: todayCheckIns.totalDocs,
//     });
//   } catch (error) {
//     console.error('Error fetching dashboard stats:', error);
//     return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
//   }
// }

export async function GET() {
    try {
    //   const currentDate = new Date();
    //   const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  
      const stats = {
        // Booking counts
        totalBookings: await getTotalBookings(),
        bookingsByType: await getBookingsByType(),
        // bookingsByStatus: await getBookingsByStatus(),
        
        // Revenue metrics
        monthlyRevenue: await getMonthlyRevenue(),
        // revenueByRoomType: await getRevenueByRoomType(),
        
        // Occupancy metrics
        // occupancyRate: await getOccupancyRate(),
        // roomTypePopularity: await getRoomTypePopularity(),
        
        // Time-based analytics
        // seasonalTrends: await getSeasonalTrends(),
        // peakBookingTimes: await getPeakBookingTimes(),
        
        // Guest analytics
        // repeatCustomers: await getRepeatCustomers(),
        // averageStayDuration: await getAverageStayDuration(),
        // guestDemographics: await getGuestDemographics()
      };
  
      return NextResponse.json(stats);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  }

  async function getBookingsByType() {
    const oneYearAgo = new Date(new Date().setMonth(new Date().getMonth() - 12));
  
    const bookings = await payload.find({
      collection: 'bookings',
      where: {
        or: [
          { 'accommodation.checkIn': { greater_than: oneYearAgo } },
          { 'event.eventDate': { greater_than: oneYearAgo } },
        ],
      },
    });
  
    const monthlyData = {
      accommodation: Array(12).fill(0),
      event: Array(12).fill(0),
    };
  
    bookings.docs.forEach((booking) => {
      let date;
  

      if (!booking.accommodation){
        return NextResponse.json({ error: 'Failed to fetch booking accmmodation data' }, { status: 500 });;
      }

      if (!booking.event){
        return NextResponse.json({ error: 'Failed to fetch booking event data' }, { status: 500 });;
      }

      // Handle accommodation data (including combined)
      if (['accommodation', 'combined'].includes(booking.bookingType)) {
        date = new Date(booking.accommodation?.checkIn);
        if (date) {
          const monthIndex = date.getMonth();
          monthlyData.accommodation[monthIndex]++;
        }
      }
  
      // Handle event data (including combined)
      if (['event', 'combined'].includes(booking.bookingType)) {
        date = new Date(booking.event?.eventDate);
        if (date) {
          const monthIndex = date.getMonth();
          monthlyData.event[monthIndex]++;
        }
      }
    });
  
    return {
      total: {
        accommodation: monthlyData.accommodation.reduce((a, b) => a + b, 0),
        event: monthlyData.event.reduce((a, b) => a + b, 0),
      },
      monthlyTrends: monthlyData,
    };
  }
  
async function getTotalBookings() {
    const bookings = await payload.find({
        collection: 'bookings',
        limit: 0,
    });

    return bookings.totalDocs;
} 

async function getMonthlyRevenue() {
  const oneYearAgo = new Date(new Date().setMonth(new Date().getMonth() - 12));

  // Fetch bookings created within the past 12 months
  const bookings = await payload.find({
    collection: 'bookings',
    where: {
      createdAt: { greater_than: oneYearAgo },
    },
  });

  // console.log("monthly rev bookings: ");
  // console.log(bookings);


  // Initialize monthly revenue data
  const monthlyRevenue = Array(12).fill(0);

  bookings.docs.forEach((booking) => {

    if (!booking.accommodation){
      return NextResponse.json({ error: 'Failed to fetch booking accommodation data' }, { status: 500 });
    }

    try{
      // console.log("single booking: ");
      // console.log(booking);

      const monthIndex = new Date(booking.createdAt).getMonth();

      // console.log("month index: ");
      // console.log(monthIndex);

      // Calculate revenue for this booking
      const price = booking.accommodation?.room.price || 0;
      // console.log("price: " + price);
      monthlyRevenue[monthIndex] += price;
      console.log("sibgle monthlyrevenue: ");
      console.log(monthlyRevenue);
    }catch(error){
      console.log("error get price:");
      console.log(error);
    }

  });

  console.log("monthly revenue: ");
  console.log(monthlyRevenue);

  return monthlyRevenue;
}
