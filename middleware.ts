import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { getCookie } from 'cookies-next'

export const config = {
  matcher: ['/dashboard', '/'],
}

export function middleware (request: NextRequest) {
  // case when the user is not logged in
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  const response = NextResponse.next();
  return response;
};
