import dbConnect from "../lib/dbConnect";
import UserModel from "../model/User";

async function CheckAlreadyRegisteredUser(username: string, email: string) {
  await dbConnect();

  try {
    const existingUsername = await UserModel.findOne({ username });

    if (existingUsername) {
      return {
        success: false,
        message: "Username already exists. Please choose a different username.",
      };
    }

    const existingUserByEmail = await UserModel.findOne({ email });

    if (existingUserByEmail) {
      return {
        success: false,
        message: "Email already exists. Please login with your credentials",
      };
    }

    return {
      success: true,
      message: "User does not exist",
    };
  } catch (err) {
    return {
      success: false,
      message: "Internal server error, please try again later",
    };
  }
}

export default CheckAlreadyRegisteredUser;
