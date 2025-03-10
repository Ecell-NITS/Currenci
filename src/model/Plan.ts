import mongoose, { Document, Schema } from "mongoose";

export interface IPlan extends Document {
  name: string;
  days: number;
  price: number;
  desc: string;
}

const PlanSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Plan ||
  mongoose.model<IPlan>("Plan", PlanSchema);
