import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../../lib/dbConnect";
import Plan from "../../../../../model/Plan";

export async function GET(req: NextRequest) {
  await dbConnect();

  if (req.method !== "GET") {
    return NextResponse.json(
      { message: `Method ${req.method} Not Allowed` },
      { status: 405 },
    );
  }

  const planId = req.nextUrl.pathname.split("/").slice(-1)[0];

  try {
    const plan = await Plan.findOne({ _id: planId });
    console.log(plan);

    if (!plan) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Plan found", plan }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
