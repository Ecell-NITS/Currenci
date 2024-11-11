import bcrypt from "bcryptjs";
import OtpModel from "../model/OTP";

export async function verifyOtp(email: string, otp: number) {
  try {
    const OTPData = await OtpModel.findOne({ email });
    const verifiedOtp = await bcrypt.compare(otp.toString(), OTPData.hashedOtp);
    if (!verifiedOtp) {
      return false;
    }

    await OtpModel.deleteMany({ email });
    return true;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return false;
  }
}
