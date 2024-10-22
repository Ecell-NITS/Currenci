import mongoose, { Schema, Document } from "mongoose";

export interface Testimonial extends Document {
  content: string;
  givenBy: string;
  createdAt: Date;
  isApproved: boolean;
}

const TestimonialSchema: Schema = new Schema({
  content: {
    type: String,
    required: true,
  },
  givenBy: {
    type: String,
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

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  imageUrl: string;
  role: string;
  testimonials?: Testimonial;
}

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
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "client"],
    default: "client",
    required: true,
  },
  testimonials: TestimonialSchema,
});

const UserModel =
  (mongoose.models.users as mongoose.Model<User>) ||
  mongoose.model<User>("users", UserSchema);

export default UserModel;
