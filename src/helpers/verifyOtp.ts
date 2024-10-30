import { NextRequest } from "next/server";
import OtpModel from "../model/OTP";

export async function verifyOtp(req: NextRequest) {
  const { email, otp } = await req.json();

  const OTPData = await OtpModel.findOne({ email });
  if (!OTPData) {
    Response.json(
      { success: false, message: "OTP not found" },
      { status: 400 },
    );
    return false;
  }
  if (OTPData.otp !== otp) {
    Response.json(
      { success: false, message: "Incorrect OTP" },
      { status: 401 },
    );
    return false;
  }
  return true;
}
