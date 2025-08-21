import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = await connectToDatabase();
    const bookings = db.collection('bookings');

    const booking = await bookings.findOne({ id: params.id });
    console.log('Fetched booking by ID:', params.id, booking);

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    console.error('Error fetching booking by ID:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}