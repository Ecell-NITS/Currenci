import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Testimonial from "../../../../model/Testimonial";

export async function DELETE(req: NextRequest) {
  if (req.method !== "DELETE") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }

  const { searchParams } = req.nextUrl;
  const testimonialId = searchParams.get("Id");

  // Connect to the database
  await dbConnect();

  try {
    const deletedTestimonial =
      await Testimonial.findByIdAndDelete(testimonialId);

    // Check if a testimonial was found and deleted
    if (!deletedTestimonial) {
      return NextResponse.json(
        { message: "Testimonial not found" },
        { status: 404 },
      );
    }

    // Return a 204 No Content response on successful deletion
    return NextResponse.json(
      { message: "testimonial deleted successfully" },
      { status: 200 },
    ); // No content response
  } catch (error) {
    console.error("Error deleting testimonial:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Error deleting testimonial", error: error.message },
      { status: 500 },
    );
  }
}
