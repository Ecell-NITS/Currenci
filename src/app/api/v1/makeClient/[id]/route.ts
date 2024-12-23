import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "../../../../../lib/dbConnect";
import UserModel from "../../../../../model/User";
import { isSuperAdmin } from "../../../../../helpers/verifyAdmin";

export async function POST(req: NextRequest) {
  await dbConnect();

  const isReqAdmin = await isSuperAdmin(req);
  if (!isReqAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { pathname } = req.nextUrl;
  const id = pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 },
    );
  }

  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json(
      { message: "Invalid User ID format" },
      { status: 400 },
    );
  }

  try {
    const user = await UserModel.findByIdAndUpdate(
      id,
      { role: "client" },
      { new: true },
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User has been made an admin", user });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
