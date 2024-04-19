import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export function middleware(req: NextRequest) {
  //   const userId = req.cookies.get("userId");
  //   console.log("+++DID WE GET A SESSION? ", await getSession());

  const userId = req.cookies.get("userId");
    console.log("##############USER ID IN REDIS IS: ", userId?.value);

  const res = NextResponse.next();

  if (!userId) {
    res.cookies.set("userId", nanoid());
  }

  return res;
}

export const config = {
  //match all request paths except for the ones starting
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
