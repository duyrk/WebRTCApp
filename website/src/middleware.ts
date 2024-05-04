import dayjs from 'dayjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export default function middleware(request: NextRequest) {
  const tokenExpiresIn = request.cookies.get('accessTokenExpiresIn')?.value;

  if (tokenExpiresIn) {
    const isTokenExpire = !dayjs().isBetween(dayjs(), dayjs(tokenExpiresIn), 'minute', '[]');

    if (isTokenExpire) {
      if (!request.url.includes('/login')) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      return NextResponse.next();
    }
    if (request.url.includes('/login')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  if (!request.url.includes('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/anime/:path*', '/dashboard/:path*', '/myanimelist'],
};
