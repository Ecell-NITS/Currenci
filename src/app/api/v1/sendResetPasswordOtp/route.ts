import { NextRequest, NextResponse } from "next/server";
import { authenticator } from "otplib";
import bcrypt from "bcryptjs";
import sendEmail from "../../../../helpers/SendEmail";
import dbConnect from "../../../../lib/dbConnect";
import OtpModel from "../../../../model/OTP";
import checkUserRegistration from "../../../../helpers/checkUserRegistration";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { usernameOrEmail } = await req.json();
    if (!usernameOrEmail) {
      return NextResponse.json(
        { message: "Email or Username is required" },
        { status: 400 },
      );
    }

    const user = await checkUserRegistration(usernameOrEmail, usernameOrEmail); // Check if the user is registered or not

    if (!user.success) {
      return NextResponse.json(
        { message: "User does not exist. Please create a new account" },
        { status: 400 },
      );
    }

    authenticator.options = { digits: 6, step: 30 };
    const secret = authenticator.generateSecret();
    const otp = authenticator.generate(secret);

    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);

    const userEmail = user.email;

    await OtpModel.deleteMany({ email: userEmail });

    const otpSent = await OtpModel.create({
      email: userEmail,
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
        userEmail,
        "OTP Verification",
        `Your OTP for password reset is ${otp}. It will expire in 5 minutes.`,
        "",
      );
    } catch (error) {
      await OtpModel.deleteOne({ email: userEmail });
      return NextResponse.json(
        { message: "Failed to send OTP to email. Please try again later" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { email: userEmail, message: "OTP sent successfully" },
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
