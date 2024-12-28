import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import { verifyOtp } from "../../../../helpers/verifyOtp";
import UserModel from "../../../../model/User";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { usernameOrEmail, otp, newPassword } = await req.json();

    if (!usernameOrEmail) {
      return NextResponse.json(
        { success: false, message: "Username or Email is Required" },
        { status: 400 },
      );
    }

    const user = await UserModel.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User does not exist." },
        { status: 404 },
      );
    }

    const otpVerified = await verifyOtp(user.email, otp);
    if (!otpVerified) {
      return NextResponse.json(
        { success: false, message: "Incorrect OTP. Please enter correct OTP" },
        { status: 401 },
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message:
          "New Password Set Successfully. Please login with you new password",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later",
        errors: error.errors,
      },
      { status: 500 },
    );
  }
}
