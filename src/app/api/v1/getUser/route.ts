import { NextRequest, NextResponse } from "next/server";
import UserModel from "../../../../model/User";
import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import dbConnect from "../../../../lib/dbConnect";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const userId = await getDataFromToken(request);
    const user = await UserModel.findOne({ _id: userId }).select("-password");

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
