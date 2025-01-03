import { supabase } from "@/app/(app)/lib/supabase"

export async function POST(req: Request) {
  // const rawBody = await req.text();
  // console.log("Raw request body:", rawBody);
  
  // const booking = await req.json()
  // console.log("booking: ", booking) 

  // const formData = await req.formData();
  // const payloadStr = formData.get('_payload') as string;
  // const booking = JSON.parse(payloadStr);
  // console.log("booking: ", booking);
  // console.log("booking: ", booking.bookingType=='accommodation');

  let booking;
  const contentType = req.headers.get('content-type');

  try {
    if (contentType?.includes('multipart/form-data')) {
        const formData = await req.formData();
        booking = JSON.parse(formData.get('_payload') as string);
    } else {
        booking = await req.json();
    }

    const bookingData = {
      booking_type: booking.bookingType,
      accommodation_room_id: booking.accommodation?.room || booking.roomType,
      accommodation_check_in: booking.accommodation?.checkIn || booking.checkIn,
      accommodation_check_out: booking.accommodation?.checkOut || booking.checkOut,
      accommodation_guests: booking.accommodation?.guests || booking.accommodationGuests,
      guest_info_first_name: booking.guestInfo?.firstName || booking.guestFirstName,
      guest_info_last_name: booking.guestInfo?.lastName || booking.guestLastName,
      guest_info_email: booking.guestInfo?.email || booking.guestEmail,
      guest_info_phone: booking.guestInfo?.phone || booking.guestPhone,
      special_requests: booking.specialRequests ||  null,
      status: booking.status || 'pending'
    };

     // booking
    if(bookingData.booking_type == 'accommodation'){
      // console.log("booking type is accommodation");
      // Check availability
      const availability = await checkRoomAvailability(bookingData.accommodation_room_id, bookingData.accommodation_check_in, bookingData.accommodation_check_out)
      console.log("availability: ", availability)

      if (!availability) {
      //   return Response.json({ error: 'Room not available for selected dates' })
          return new Response(JSON.stringify({ message: 'Room not available for selected dates' }), { 
              status: 400, // Bad Request
              headers: { 'Content-Type': 'application/json' },
          });
      }

      // console.log("booking: ",booking)

      // Create booking
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          booking_type: bookingData.booking_type,
          accommodation_room_id: bookingData.accommodation_room_id,
          accommodation_check_in: bookingData.accommodation_check_in,
          accommodation_check_out: bookingData.accommodation_check_out, 
          accommodation_guests: bookingData.accommodation_guests,
          guest_info_first_name: bookingData.guest_info_first_name,
          guest_info_last_name: bookingData.guest_info_last_name,
          guest_info_email: bookingData.guest_info_email,
          guest_info_phone: bookingData.guest_info_phone,
          special_requests: bookingData.special_requests ? bookingData.special_requests : null,
          status: bookingData.status,
        })
        .select()
    
      // return Response.json({ data, error })
      if (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'Failed to create booking', error }), {
            status: 500, // Internal Server Error
            headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ message: 'Booking successful', data }), {
          status: 200, // OK
          headers: { 'Content-Type': 'application/json' },
      });

    }
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ message: 'Invalid request format', e }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    });
  }

 

  // event 
  if(booking.bookingType == 'event'){
    console.log("booking: ",booking)

    // Check availability
    const availability = await checkEventAvailability(booking.event.eventDate)
    console.log("availability: ", availability)

    if (!availability) {
    //   return Response.json({ error: 'Room not available for selected dates' })
        return new Response(JSON.stringify({ message: 'Room not available for selected dates' }), { 
            status: 400, // Bad Request
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Create booking
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        booking_type: booking.bookingType,
        event_event_date: booking.eventDate,
        event_start_time: booking.event.startTime,
        event_end_time: booking.event.endTime, 
        event_guests: booking.eventGuests,
        guest_info_first_name: booking.guestInfo.firstName,
        guest_info_last_name: booking.guestInfo.lastName,
        guest_info_email: booking.guestInfo.email,
        guest_info_phone: booking.guestInfo.phone,
        special_requests: booking.specialRequests ? booking.specialRequests : null,
        status: booking.status
      })
      .select()
  
    // return Response.json({ data, error })
    if (error) {
        return new Response(JSON.stringify({ message: 'Failed to create booking', error }), {
            status: 500, // Internal Server Error
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify({ message: 'Booking successful', data }), {
        status: 200, // OK
        headers: { 'Content-Type': 'application/json' },
    });

  }

  //combined
  if(booking.bookingType == 'combined'){
    // Check availability
   

  } 

}

async function checkRoomAvailability(roomId: number, checkIn: Date, checkOut: Date) {
  console.log('Checking availability: ', roomId, checkIn, checkOut);
    const { data: existingBookings, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('accommodation_room_id', roomId)
      .neq('status', 'cancelled')
      // .or(`accommodation_check_in.lte.${checkOut},accommodation_check_out.gte.${checkIn}`)
      .filter('accommodation_check_in', 'lt', checkOut)
      .filter('accommodation_check_out', 'gt', checkIn);

      

   
    if (error) {
        console.log(error)
      throw new Error('Failed to check availability')
    }
   
    console.log("availabel: ", existingBookings)
    return existingBookings.length === 0
}

async function checkEventAvailability(eventDate: Date) {
  const { data: existingBookings, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('event_event_date', eventDate)
    .neq('status', 'cancelled')
 
  if (error) {
      console.log(error)
    throw new Error('Failed to check availability')
  }
 
  console.log("availabel: ", existingBookings)
  return existingBookings.length === 0
}