import { supabase } from "@/app/(app)/lib/supabase"

async function checkAvailability(roomId: number, checkIn: Date, checkOut: Date) {
    const { data: existingBookings, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('room_id', roomId)
      .neq('status', 'cancelled')
      .or(`check_in.lte.${checkOut},check_out.gte.${checkIn}`)
   
    if (error) {
      throw new Error('Failed to check availability')
    }
   
    return existingBookings.length === 0
   }