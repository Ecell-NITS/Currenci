import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const path = url.pathname;

  const token = request.cookies.get("signInToken")?.value || "";

  if (token && (path === "/signIn" || path === "/signUp")) {
    const response = NextResponse.redirect(new URL("/", url));
    response.cookies.set("toastMessage", "Logged in successfully", {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 5,
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signIn", "/signUp"],
};
