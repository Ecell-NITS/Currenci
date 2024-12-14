import { NextRequest, NextResponse } from "next/server";
import { authenticator } from "otplib";
import bcrypt from "bcryptjs";
import sendEmail from "../../../../helpers/SendEmail";
import dbConnect from "../../../../lib/dbConnect";
import OtpModel from "../../../../model/OTP";
import CheckAlreadyRegisteredUser from "../../../../helpers/checkAlreadyRegisteredUser";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { username, email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    const alreadyRegistered = await CheckAlreadyRegisteredUser(username, email); // Check if the user is already registered

    if (!alreadyRegistered.success) {
      return NextResponse.json(
        { message: alreadyRegistered.message },
        { status: 400 },
      );
    }

    authenticator.options = { digits: 6, step: 30 };
    const secret = authenticator.generateSecret();
    const otp = authenticator.generate(secret);

    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);

    await OtpModel.deleteMany({ email });

    const otpSent = await OtpModel.create({
      email,
      hashedOtp,
    });

    if (!otpSent) {
      return NextResponse.json(
        { message: "Failed to save OTP in database. Please try again later" },
        { status: 400 },
      );
    }

    try {
      await sendEmail(
        email,
        "OTP Verification",
        `Your OTP is ${otp}. It will expire in 5 minutes.`,
        "",
      );
    } catch (error) {
      await OtpModel.deleteOne({ email });
      return NextResponse.json(
        { message: "Failed to send OTP to email. Please try again later" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
