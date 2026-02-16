import { NextResponse, type NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const uID = req.cookies.get('uID')?.value;
  const { pathname } = req.nextUrl;

  if (!uID) {
    const url = new URL('/login', req.url);
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith('/dashboard')) {
    const allowedAdmins = process.env.ALLOWED_ADMINS?.split(',') || [];

    if (!allowedAdmins.includes(uID)) {
      console.warn(`Unauthorized access attempt to dashboard by: ${uID}`);
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/content/:path*',
    '/quiz/:path*',
    '/assessment',
    '/chatbot',
    '/',
    '/dashboard',
  ],
};
