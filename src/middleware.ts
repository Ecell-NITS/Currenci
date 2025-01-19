import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const path = url.pathname;

  const token = request.cookies.get("signInToken")?.value || "";
  const adminToken = request.cookies.get("adminToken")?.value || "";

  if (token && (path === "/signIn" || path === "/signUp")) {
    const response = NextResponse.redirect(new URL("/", url));
    response.cookies.set("toastMessage", "Already Logged In", {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 5,
    });
    return response;
  }

  if (!adminToken && (path === "/admin" || path === "/admin/addTeamMember")) {
    const response = NextResponse.redirect(new URL("/", url));
    response.cookies.set("toastMessage", "Admin Access Required", {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 5,
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signIn", "/signUp", "/admin", "/admin/addTeamMember"],
};
