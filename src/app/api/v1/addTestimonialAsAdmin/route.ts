// import type { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";
import Testimonial from "../../../../model/Testimonial";
import dbConnect from "../../../../lib/dbConnect";

interface TestimonialI {
  userId: number;
  content: string;
  createdAt: Date;
  role: string;
}

const testimonials: TestimonialI[] = [];

export async function POST(req: NextRequest) {
  await dbConnect();
  if (req.method === "POST") {
    const { content, userId } = await req.json();

    if (!content) {
      return NextResponse.json(
        { message: "Content is required" },
        { status: 400 },
      );
    }

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 },
      );
    }

    const testimonial: TestimonialI = {
      userId,
      content,
      createdAt: new Date(),
      role: "admin",
    };

    testimonials.push(testimonial);
    Testimonial.create(testimonial);
    return NextResponse.json(
      { message: "Testimonial added as admin successfully", testimonial },
      { status: 200 },
    );
  }

  // res.setHeader('Allow', ['POST']);
  return NextResponse.json(
    { message: `Method ${req.method} Not Allowed` },
    { status: 405 },
  );
}
