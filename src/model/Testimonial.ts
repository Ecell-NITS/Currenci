import mongoose, { Document, Schema } from "mongoose";

export interface ITestimonial extends Document {
  userId: string;
  content: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    content: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
