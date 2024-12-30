type Booking = {
    roomId: number
    checkIn: Date
    checkOut: Date
    guestName: string
    guestEmail: string
    status: 'pending' | 'confirmed'
}