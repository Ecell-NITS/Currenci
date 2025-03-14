import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import moment from "moment-timezone";
import Testimonial from "../../../../model/Testimonial";
import dbConnect from "../../../../lib/dbConnect";

interface TestimonialInter {
  userId: number;
  content: string;
  createdAt: Date;
}

const JWT_SECRET = process.env.JWT_TOKEN_SECRET;

export async function POST(req: NextRequest) {
  await dbConnect();

  if (req.method !== "POST") {
    return NextResponse.json(
      { message: `Method ${req.method} Not Allowed` },
      { status: 405 },
    );
  }

  try {
    const { content } = await req.json();

    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "A token is required for authentication" },
        { status: 403 },
      );
    }

    const user = await jwt.verify(token, JWT_SECRET);
    console.log(user);

    if (!content) {
      return NextResponse.json(
        { message: "Content is required" },
        { status: 400 },
      );
    }

    const testimonial: TestimonialInter = {
      userId: (user as { id: number }).id,
      content,
      createdAt: moment().tz("Asia/Kolkata").toDate(),
    };

    await Testimonial.create(testimonial);

    return NextResponse.json(
      { message: `Testimonial added successfully`, testimonial },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
