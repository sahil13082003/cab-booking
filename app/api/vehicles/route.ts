import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const db = await connectToDatabase();
    const vehicles = db.collection('vehicles');

    const allVehicles = await vehicles.find({}).toArray();
    console.log('Fetched vehicles:', allVehicles);

    return NextResponse.json(allVehicles, { status: 200 });
  } catch (error) {
    console.error('Vehicle fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}