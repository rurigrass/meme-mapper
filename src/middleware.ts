import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const userId = req.cookies.get("userId");
  const res = NextResponse.next();

  if (!userId) {
    res.cookies.set("userId", "swag");
  }

  return res;
}

export const config = {
  //match all request paths except for the ones starting
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
