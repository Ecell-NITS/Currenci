import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "../../../../model/User";
import dbConnect from "../../../../lib/dbConnect";

export async function PUT(req: NextRequest) {
  await dbConnect();

  if (req.method !== "PUT") {
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

    const { fullname, imageUrl, email, phoneNumber } = await req.json();

    const user = await UserModel.findOne({ _id: decoded.id });

    if (!user) {
      return NextResponse.json(
        { message: "User not found. Please login and try again." },
        { status: 404 },
      );
    }

    user.fullname = fullname || user.fullname;
    user.imageUrl = imageUrl || user.imageUrl;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    await user.save();

    return NextResponse.json(
      { message: "Team member updated successfully", user },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 401 },
    );
  }
}
