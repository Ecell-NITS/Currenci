import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import moment from "moment-timezone";
import Testimonial from "../../../../model/Testimonial";
import dbConnect from "../../../../lib/dbConnect";

interface TestimonialInter {
  username: string;
  content: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  user: string; // Stores the ObjectId of the user as a string
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
    const { content, rating } = await req.json();

    // Get token from cookies
    const token = req.cookies.get("signInToken")?.value || "";
    if (!token) {
      return NextResponse.json(
        { message: "A token is required for authentication" },
        { status: 403 },
      );
    }

    // Verify the token and extract user data.
    // Note: The token might have the user ID under `_id` or `id`
    const decoded = jwt.verify(token, JWT_SECRET) as {
      _id?: string;
      id?: string;
      username: string;
    };

    const userId = decoded._id || decoded.id;
    if (!userId) {
      return NextResponse.json(
        { message: "Invalid token payload: missing user id" },
        { status: 403 },
      );
    }

    if (!content) {
      return NextResponse.json(
        { message: "Content is required" },
        { status: 400 },
      );
    }

    // Create the testimonial object with the user reference.
    const testimonial: TestimonialInter = {
      username: decoded.username,
      content,
      rating,
      createdAt: moment().tz("Asia/Kolkata").toDate(),
      updatedAt: moment().tz("Asia/Kolkata").toDate(),
      user: userId,
    };

    await Testimonial.create(testimonial);

    return NextResponse.json(
      { message: "Testimonial added successfully", testimonial },
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
