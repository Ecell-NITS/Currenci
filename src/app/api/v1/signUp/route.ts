import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import dbConnect from "../../../../lib/dbConnect";
import { verifyOtp } from "../../../../helpers/verifyOtp";
import UserModel from "../../../../model/User";

const userSchema = z.object({
  username: z
    .string()
    .min(4, "Username must have at least 4 characteres")
    .max(20, "Username must be less than 20 characters"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
  otp: z.string().length(6, "OTP must be 6 characters long"),
});

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { username, email, password, otp } = userSchema.parse(
      await req.json(),
    );

    // ALREADY CHECKED USER EXISTS OR NOT USING checkAlreadyRegisteredUser HELPER
    // const existingUsername = await UserModel.findOne({ username });
    // if (existingUsername) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message:
    //         "Username already exists. Please choose a different username",
    //     },
    //     { status: 400 },
    //   );
    //  }
    //  const existingUserByEmail = await UserModel.findOne({ email });
    //  if (existingUserByEmail) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Email already exists. Please login with your credentials",
    //     },
    //     { status: 400 },
    //   );
    // }
    // ALREADY CHECKED USER EXISTS OR NOT USING checkAlreadyRegisteredUser HELPER

    const otpVerified = await verifyOtp(email, otp);
    if (!otpVerified) {
      return NextResponse.json(
        { success: false, message: "Incorrect OTP. Please enter correct OTP" },
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
