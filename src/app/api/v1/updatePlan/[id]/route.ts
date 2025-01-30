import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../../lib/dbConnect";
import Plan from "../../../../../model/Plan";

export async function PUT(req: NextRequest) {
  await dbConnect();

  const token = req.cookies.get("signInToken")?.value || "";

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized: No token provided" },
      { status: 401 },
    );
  }

  const { pathname } = req.nextUrl;
  const id = pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { message: "Plan id is required" },
      { status: 400 },
    );
  }

  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json(
      { message: "Invalid Plan ID format" },
      { status: 400 },
    );
  }

  const { name, days, price } = await req.json();

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    if (decoded.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden: Admin access required" },
        { status: 403 },
      );
    }

    const plan = await Plan.findByIdAndUpdate(
      id,
      { name, days, price },
      { new: true },
    );

    if (!plan) {
      return NextResponse.json({ message: "plan not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "plan has been updated by an admin",
      plan,
    });
  } catch (error) {
    console.error("Error updating plan:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
