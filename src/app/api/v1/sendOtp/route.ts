import { NextResponse } from "next/server";
import sendEmail from "../../../../helpers/SendEmail";
import dbConnect from "../../../../lib/dbConnect";
import OtpModel from "../../../../model/OTP";

export async function POST(req) {
  await dbConnect();

  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`Generated OTP for ${email}: ${otp}`);

    await OtpModel.deleteMany({ email });

    const otpSent = await OtpModel.create({
      email,
      otp,
    });

    if (!otpSent) {
      return NextResponse.json(
        { message: "Failed to send OTP" },
        { status: 400 },
      );
    }

    sendEmail(
      email,
      "OTP Verification",
      `Your OTP is ${otp}. It will expire in 5 minutes.`,
      "",
    );

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

// const verifyOtp = async (email: string, otp: number) => {
//     try {
//         console.log(`OTP for ${email} is ${otp}`);

//         const otpData = await OtpModel.findOne({email});
//         if (!otpData) {
//             Response.json({ message: "OTP not found" }, { status: 400 });
//             return false;
//         }
//         if (otpData.otp !== otp) {
//             Response.json({ message: "Incorrect OTP" }, { status: 401 });
//             return false;
//         }
//         if (otpData.otp === otp) {
//             await OtpModel.findByIdAndDelete({
//                 where: {
//                     id: otpData.id,
//                 },
//             });
//         }
//         return true;
//     } catch (error) {
//         console.log(error);
//         Response.json({ message: "Internal server error" }, { status: 500 });
//         return false;
//     }
// };
