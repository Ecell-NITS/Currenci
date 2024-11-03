import OtpModel from "../model/OTP";

export async function verifyOtp(email: string, otp: number) {
  const OTPData = await OtpModel.findOne({ email });
  if (!OTPData || OTPData.otp !== otp) {
    return false;
  }
  await OtpModel.deleteMany({ email });
  return true;
}
