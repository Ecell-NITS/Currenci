import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import moment from "moment-timezone";
import TeamMember from "../../../../../model/TeamMember";
import dbConnect from "../../../../../lib/dbConnect";

export async function PUT(req: NextRequest) {
  await dbConnect();

  if (req.method !== "PUT") {
    return NextResponse.json(
      { message: `Method ${req.method} Not Allowed` },
      { status: 405 },
    );
  }

  const memberId = req.nextUrl.pathname.split("/").slice(-1)[0];

  const token = req.cookies.get("signInToken")?.value || "";

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized: No token provided" },
      { status: 401 },
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    if (decoded.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden: Admin access required" },
        { status: 403 },
      );
    }

    const { name, designation, email, linkedin, image } = await req.json();

    const teamMember = await TeamMember.findOne({ memberId });

    if (!teamMember) {
      return NextResponse.json(
        { message: "Team member not found" },
        { status: 404 },
      );
    }

    teamMember.name = name || teamMember.name;
    teamMember.image = image || teamMember.image;
    teamMember.designation = designation || teamMember.designation;
    teamMember.email = email || teamMember.email;
    teamMember.linkedin = linkedin || teamMember.linkedin;
    teamMember.updatedAt = moment().tz("Asia/Kolkata").format();

    await teamMember.save();

    return NextResponse.json(
      { message: "Team member updated successfully", teamMember },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 401 },
    );
  }
}
