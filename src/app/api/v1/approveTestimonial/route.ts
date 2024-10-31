import { NextRequest, NextResponse } from "next/server";
// import { NextRequest, NextApiResponse } from 'next';
import dbConnect from "../../../../lib/dbConnect";
import Testimonial from "../../../../model/Testimonial";

export async function PUT(req: NextRequest) {
  if (req.method !== "PUT") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }
  const { searchParams } = req.nextUrl;
  const testimonialId = searchParams.get("Id");
  console.log(testimonialId);

  await dbConnect();

  try {
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
