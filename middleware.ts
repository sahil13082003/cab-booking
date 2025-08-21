import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'abcde12345'; // Match with API

export function middleware(request: NextRequest) {
  console.log('Middleware triggered for:', request.nextUrl.pathname);

  // Exclude the login page from middleware
  if (request.nextUrl.pathname === '/admin/dashboard' || request.nextUrl.pathname === '/admin') {
    console.log('Allowing access to /admin');
    return NextResponse.next();
  }

  // Protect all other /admin/* routes
//   if (request.nextUrl.pathname.startsWith('/admin/')) {
//     const token = request.cookies.get('adminToken')?.value;
//     console.log('Middleware: Token from cookie:', token);

//     if (!token) {
//       console.log('No token found, redirecting to /admin');
//       return NextResponse.redirect(new URL('/admin', request.url));
//     }

//     try {
//       console.log('Verifying token with JWT_SECRET:', JWT_SECRET);
//       jwt.verify(token, JWT_SECRET);
//       console.log('Token verified, allowing access');
//       return NextResponse.next();
//     } catch (error) {
//       console.log('Token verification failed:', error.message);
//       return NextResponse.redirect(new URL('/admin', request.url));
//     }
//   }

  return NextResponse.next();
}

