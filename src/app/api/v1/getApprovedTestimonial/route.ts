import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Testimonial from "../../../../model/Testimonial";

export async function GET(req: NextRequest) {
  await dbConnect();

  if (req.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }

  try {
    const testimonials = await Testimonial.find({ isApproved: true });
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    console.error("Error fetching approved testimonials:", error);
    return NextResponse.json(
      { message: "Error fetching approved testimonials", error: error.message },
      { status: 500 },
    );
  }
}
