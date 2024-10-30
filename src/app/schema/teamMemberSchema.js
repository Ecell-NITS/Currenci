const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  type: "object",
  properties: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "developer", "designer", "manager", "other"],
      default: "admin",
    },
    required: ["id", "name", "email", "role"],
    additionalProperties: false,
  },
});

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

module.exports = TeamMember;
