import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Plan from "../../../../model/Plan";

export async function GET(req: NextRequest) {
  await dbConnect();

  if (req.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }

  try {
    const plans = await Plan.find({});
    return NextResponse.json(plans, { status: 200 });
  } catch (error) {
    console.error("Error fetching plans:", error);
    return NextResponse.json(
      { message: "Error fetching plans", error: error.message },
      { status: 500 },
    );
  }
}
