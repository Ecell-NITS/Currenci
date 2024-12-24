import mongoose, { Schema, Document } from "mongoose";
import moment from "moment-timezone";

export interface Query extends Document {
  email: string;
  name: string;
  query: string;
  createdAt: Date;
}

const QuerySchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: () => moment().tz("Asia/Kolkata").toDate(),
  },
});

const QueryModel =
  (mongoose.models.query as mongoose.Model<Query>) ||
  mongoose.model<Query>("query", QuerySchema);

export default QueryModel;
