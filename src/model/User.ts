import mongoose, { Schema, Document } from "mongoose";

export interface Testimonial extends Document {
  content: string;
  givenBy: User;
  createdAt: Date;
  isApproved: boolean;
}

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  imageUrl?: string;
  role: string;
  testimonials?: Testimonial;
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
    default: Date.now,
  },
  isApproved: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "client"],
    default: "client",
    required: true,
  },
  testimonials: {
    type: Schema.Types.ObjectId,
    ref: "testimonials",
  },
});

const UserModel =
  (mongoose.models.users as mongoose.Model<User>) ||
  mongoose.model<User>("users", UserSchema);

export const TestimonialModel =
  (mongoose.models.testimonials as mongoose.Model<Testimonial>) ||
  mongoose.model<Testimonial>("testimonials", TestimonialSchema);

export default UserModel;
