import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import TeamMember from "../../../../../model/TeamMember";
import dbConnect from "../../../../../lib/dbConnect";

export async function GET(req: NextRequest) {
  await dbConnect();

  const id = req.nextUrl.pathname.split("/").slice(-1)[0];

  if (req.method !== "GET") {
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
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    if (decoded.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden: Admin access required" },
        { status: 403 },
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }

  try {
    const teamMember = await TeamMember.findOne({ memberId: id });

    if (!teamMember) {
      return NextResponse.json(
        { message: "Team member not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Team member fetched successfully", teamMember },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
