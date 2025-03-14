import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../lib/dbConnect";
import UserModel from "../../../../model/User";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { usernameOrEmail, password } = await req.json();
    const user = await UserModel.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User does not exist. Please create a new account",
        },
        { status: 400 },
      );
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return Response.json(
        { success: false, message: "Incorrect Password. Please try again." },
        { status: 400 },
      );
    }
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "12h",
    });

    const response = NextResponse.json(
      { success: true, message: "User logged in successfully" },
      { status: 200 },
    );

    if (user.role === "admin") {
      response.cookies.set("adminToken", token, { httpOnly: true, path: "/" });
    }
    response.cookies.set("signInToken", token, { httpOnly: true, path: "/" });

    return response;
  } catch (err) {
    return Response.json({ success: false, message: err }, { status: 500 });
  }
}
