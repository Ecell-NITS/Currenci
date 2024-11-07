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
    try {
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

      await Testimonial.create(testimonial);

      return NextResponse.json(
        { message: "Testimonial added as admin successfully", testimonial },
        { status: 200 },
      );
    } catch (error) {
      console.error("Error adding testimonial:", error);
      return NextResponse.json(
        { message: "An error occurred while adding the testimonial" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json(
    { message: `Method ${req.method} Not Allowed` },
    { status: 405 },
  );
}
