import { NextRequest, NextResponse } from "next/server";
import sendEmail from "../../../../helpers/SendEmail";
import sendEmailToAdmin from "../../../../helpers/SendEmailToAdmin";
import dbConnect from "../../../../lib/dbConnect";
import QueryModel from "../../../../model/Query";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { email, name, query } = await req.json();

    if (!query) {
      return NextResponse.json(
        { message: "No Query Found. Query is required" },
        { status: 400 },
      );
    }

    const newQuery = new QueryModel({
      email,
      name,
      query,
    });

    await newQuery.save();

    sendEmailToAdmin(
      `New Query from ${name}`,
      `Name: ${name}\n\nEmail: ${email}\n\nQuery: ${query}`,
      "",
    );

    sendEmail(
      email,
      "We have received your query!",
      `Hello ${name},\n\nThank you for reaching out to us! We have received your query:\n\n"${query}"\n\nOur team will get back to you soon.\n\nBest regards,\nCustomer Support\nTeam Currenci`,
      "",
    );

    return NextResponse.json(
      { message: "Query Send Successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error Sending Query" },
      { status: 500 },
    );
  }
}
