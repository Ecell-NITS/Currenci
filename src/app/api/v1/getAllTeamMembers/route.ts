import { NextRequest, NextResponse } from "next/server";
import TeamMember from "../../../../model/TeamMember";
import dbConnect from "../../../../lib/dbConnect";

export async function GET(req: NextRequest) {
  await dbConnect();

  if (req.method !== "GET") {
    return NextResponse.json(
      { message: `Method ${req.method} Not Allowed` },
      { status: 405 },
    );
  }

  // const token = req.cookies.get("signInToken")?.value || "";

  // if (!token) {
  //   return NextResponse.json(
  //     { message: "Unauthorized: No token provided" },
  //     { status: 401 },
  //   );
  // }

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

  //   if (decoded.role !== "admin") {
  //     return NextResponse.json(
  //       { message: "Forbidden: Admin access required" },
  //       { status: 403 },
  //     );
  //   }
  // Not required for now because client can also view team members through team member page

  try {
    const teamMembers = await TeamMember.find();

    return NextResponse.json(
      { message: "Team members fetched successfully", teamMembers },
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
