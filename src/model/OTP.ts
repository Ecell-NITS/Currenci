import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator(v) {
        return /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  hashedOtp: { type: String, required: [true, "OTP is required"] },
  createdAt: { type: Date, default: Date.now, expires: 300 },
});

const OtpModel = mongoose.models.OTP || mongoose.model("OTP", otpSchema);

export default OtpModel;
