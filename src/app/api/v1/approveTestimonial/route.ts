import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../lib/dbConnect";
import Testimonial from "../../../../model/Testimonial";

export async function PUT(req: NextRequest) {
  if (req.method !== "PUT") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }
  const token = req.cookies.get("signInToken")?.value || "";

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized: No token provided" },
      { status: 401 },
    );
  }

  const { searchParams } = req.nextUrl;
  const testimonialId = searchParams.get("Id");

  await dbConnect();

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    if (decoded.role !== "admin" || decoded.role !== "superadmin") {
      return NextResponse.json(
        { message: "Forbidden: Admin access required" },
        { status: 403 },
      );
    }
    const testimonial = await Testimonial.findByIdAndUpdate(
      testimonialId,
      { isApproved: true },
      { new: true },
    );

    if (!testimonial) {
      return NextResponse.json(
        { message: "Testimonial not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(testimonial, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error approving testimonial", error },
      { status: 500 },
    );
  }
}
