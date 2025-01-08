import mongoose, { Document, Schema } from "mongoose";
import type { User } from "./User";

export interface ITestimonial extends Document {
  content: string;
  givenBy: User;
  createdAt: Date;
  isApproved: boolean;
  updatedAt: Date;
}

const TestimonialSchema: Schema = new Schema({
  content: {
    type: String,
    required: true,
  },
  givenBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  isApproved: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
