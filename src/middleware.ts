import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const path = url.pathname;

  const token = request.cookies.get("signInToken")?.value || "";

  if (token && (path === "/signIn" || path === "/signUp")) {
    const response = NextResponse.redirect(new URL("/", url));
    response.cookies.set("toastMessage", "Already Logged In", {
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

const jwt = require("jsonwebtoken");

export async function adminAuth(req, res, next) {
  const token = await req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    // Check if the user has an admin role
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
  return next();
}
