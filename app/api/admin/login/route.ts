import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'abcde12345'; // Match this with middleware

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Login request received:', body);

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const admins = db.collection('admins');

    console.log('Checking admin with email:', email);
    const admin = await admins.findOne({ email });
    console.log('Found admin:', admin);

    if (!admin) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = jwt.sign({ email: admin.email, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });

    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });
    response.cookies.set('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}