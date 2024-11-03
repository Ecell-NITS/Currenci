import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import { verifyOtp } from "../../../../helpers/verifyOtp";
import UserModel from "../../../../model/User";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { username, email, password, otp } = await req.json();

    const existingUsername = await UserModel.findOne({ username });

    if (existingUsername) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Username already exists. Please choose a different username",
        },
        { status: 400 },
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });

    if (existingUserByEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists. Please login with your credentials",
        },
        { status: 400 },
      );
    }
    const otpVerified = await verifyOtp(email, otp);
    if (!otpVerified) {
      return NextResponse.json(
        { success: false, message: "OTP verification failed" },
        { status: 401 },
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { success: true, message: "User created successfully" },
      { status: 201 },
    );
  } catch (error) {
    // console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
