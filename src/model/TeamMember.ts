import mongoose, { Document, Schema } from "mongoose";
import moment from "moment-timezone";
import { v4 as uuidv4 } from "uuid";

export interface ITeamMember extends Document {
  memberId: string;
  name: string;
  designation: string;
  email: string;
  linkedin?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema: Schema = new Schema({
  memberId: {
    type: String,
    unique: true,
    default: uuidv4,
  },
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: () => moment().tz("Asia/Kolkata").format(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: () => moment().tz("Asia/Kolkata").format(),
  },
});

TeamMemberSchema.pre("save", function (next) {
  this.updatedAt = moment().tz("Asia/Kolkata").format();
  next();
});

export default mongoose.models.TeamMember ||
  mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);
