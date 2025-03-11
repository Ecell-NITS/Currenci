import mongoose, { Document, Schema } from "mongoose";

interface IUser {
  _id: string;
  imageUrl?: string;
  role?: string;
}

export interface ITestimonial extends Document {
  content: string;
  username: string;
  rating: number;
  createdAt: Date;
  isApproved: boolean;
  updatedAt: Date;
  user: IUser;
}

const TestimonialSchema: Schema = new Schema({
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  user: {
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
