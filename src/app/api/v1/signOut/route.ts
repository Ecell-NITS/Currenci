import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Sign out successfully",
      success: true,
    });

    response.cookies.set("signInToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: "Sign out failed", success: false });
  }
}
