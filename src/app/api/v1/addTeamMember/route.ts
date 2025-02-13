import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import moment from "moment-timezone";
import TeamMember from "../../../../model/TeamMember";
import dbConnect from "../../../../lib/dbConnect";

export interface ITeamMember extends Document {
  name: string;
  designation: string;
  email: string;
  linkedin?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function POST(req: NextRequest) {
  await dbConnect();

  if (req.method !== "POST") {
    return NextResponse.json(
      { message: `Method ${req.method} Not Allowed` },
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

  try {
    const decoded = await jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    if (decoded.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden: Admin access required" },
        { status: 403 },
      );
    }

    try {
      const { name, designation, email, linkedin, image } = await req.json();

      if (!name || !designation || !email) {
        return NextResponse.json(
          { message: "The fields (name,email,designation) are required" },
          { status: 400 },
        );
      }

      const teamMember: ITeamMember = await TeamMember.create({
        name,
        image,
        designation,
        email,
        linkedin,
        createdAt: moment().tz("Asia/Kolkata").format(),
        updatedAt: moment().tz("Asia/Kolkata").format(),
      });

      return NextResponse.json(
        { message: "Team member added successfully", teamMember },
        { status: 201 },
      );
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 },
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid Authorization token" },
      { status: 401 },
    );
  }
}
