import dbConnect from "../lib/dbConnect";
import UserModel from "../model/User";

async function checkUserRegistration(username: string, email: string) {
  await dbConnect();

  try {
    const existingUsername = await UserModel.findOne({ username });

    if (existingUsername) {
      return {
        success: true,
        message: "Username already exists. Please choose a different username.",
        email: existingUsername.email,
      };
    }

    const existingUserByEmail = await UserModel.findOne({ email });

    if (existingUserByEmail) {
      return {
        success: true,
        message: "Email already exists. Please login with your credentials",
        email: existingUserByEmail.email,
      };
    }

    return {
      success: false,
      message: "User does not exist",
    };
  } catch (err) {
    return {
      success: false,
      message: "Internal server error, please try again later",
    };
  }
}

export default checkUserRegistration;
