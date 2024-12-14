import bcrypt from "bcryptjs";
import dbConnect from "../../../../lib/dbConnect";
import UserModel from "../../../../model/User";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await req.json();

    const existingUsername = await UserModel.findOne({ username });

    if (existingUsername) {
      return Response.json(
        {
          success: false,
          message:
            "Username already exists. Please choose a different username",
        },
        { status: 400 },
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });

    if (existingUserByEmail) {
      return Response.json(
        {
          success: false,
          message: "Email already exists. Please login with your credentials",
        },
        { status: 400 },
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

    return Response.json(
      { success: true, message: "User created successfully" },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
