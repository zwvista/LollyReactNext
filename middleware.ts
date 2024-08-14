import { NextRequest, NextResponse } from 'next/server'
import { GlobalVars } from "@/common/common";
import { getCookies } from 'next-client-cookies/server';

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(path);
  const cookies = getCookies();
  const loggedIn = cookies.get('userid');
  console.log(loggedIn);

  if (authRequired && !loggedIn)
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  else
    GlobalVars.userid = loggedIn!;
  if (path === '/')
    return NextResponse.redirect(new URL('/words-unit2', req.nextUrl));
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
