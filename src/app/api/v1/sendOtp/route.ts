import { NextRequest, NextResponse } from "next/server";
import { authenticator } from "otplib";
import bcrypt from "bcryptjs";
import sendEmail from "../../../../helpers/SendEmail";
import dbConnect from "../../../../lib/dbConnect";
import OtpModel from "../../../../model/OTP";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
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
        { message: "Failed to save OTP in database" },
        { status: 400 },
      );
    }

    // Await sendEmail to check for success or failure
    const emailResponse = await sendEmail(
      email,
      "OTP Verification",
      `Your OTP is ${otp}. It will expire in 5 minutes.`,
      "",
    );

    // Check if email sending was successful
    if (!emailResponse.success) {
      // If email sending fails, delete the saved OTP entry
      await OtpModel.deleteOne({ email });
      return NextResponse.json(
        { message: emailResponse.error || "Failed to send OTP email" },
        { status: 500 },
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
