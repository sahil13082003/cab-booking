import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Booking request received:', body);

    const db = await connectToDatabase();
    const bookings = db.collection('bookings');

    // Generate a unique ID if not provided
    const bookingId = body.id || 'WC' + Math.random().toString(36).substr(2, 8).toUpperCase();

    const newBooking = {
      id: bookingId,
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      pickup: body.pickup,
      dropLocation: body.dropLocation,
      date: body.date,
      time: body.time,
      vehicleType: body.vehicleType,
      status: body.status || 'pending',
      driverName: body.driverName || 'Unassigned',
      totalAmount: body.totalAmount,
      distance: body.distance,
    };

    const result = await bookings.insertOne(newBooking);
    console.log('Booking created:', result);

    return NextResponse.json({ message: 'Booking created', bookingId: bookingId }, { status: 201 });
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const db = await connectToDatabase();
    const bookings = db.collection('bookings');

    const allBookings = await bookings.find({}).toArray();
    console.log('Fetched bookings:', allBookings);

    return NextResponse.json(allBookings, { status: 200 });
  } catch (error) {
    console.error('Booking fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}