import { NextRequest, NextResponse } from 'next/server'
import { GlobalVars } from "@/common/common";
import { cookies } from "next/headers";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(path);
  const loggedIn = cookies().get('userid')?.value;

  if (authRequired && !loggedIn.value)
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  else
    GlobalVars.userid = loggedIn.value!;
  if (path === '/')
    return NextResponse.redirect(new URL('/words-unit', req.nextUrl));
  return NextResponse.next()
}
