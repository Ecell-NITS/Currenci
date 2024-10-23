/* eslint-disable consistent-return */
const express = require("express");
const mongoose = require("mongoose");
const adminAuth = require("./src/middleware/adminAuth"); // The adminAuth middleware
const TeamMember = require("./src/app/schema"); // TeamMember model
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || " ", {});

// List all the team member

app.get("/api/v1/getAllTeamMembers", adminAuth, async (req, res) => {
  try {
    // Find all team members in the database
    const teamMembers = await TeamMember.find();

    // Return the list of team members
    res.status(200).json({
      status: "success",
      message: "List of all team members",
      data: teamMembers,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error. Please try again later.",
    });
  }
});

// Add Team Members

app.post("/api/v1/addTeamMember", adminAuth, async (req, res) => {
  const { name, email, role } = await req.body;

  // Validate incoming request
  if (!name || !email || !role) {
    return res.status(400).json({
      status: "error",
      message: "Please provide name, email, and role.",
    });
  }

  try {
    // Check if the email already exists
    const existingMember = await TeamMember.findOne({ email });
    if (existingMember) {
      return res.status(400).json({
        status: "error",
        message: "Team member with this email already exists.",
      });
    }

    // Create a new team member

    const teamMember = new TeamMember({
      name,
      email,
      role,
    });

    // Save the new member to the database
    const saveTeamMember = await teamMember.save();

    res.status(201).json({
      status: "success",
      message: "Team member added successfully.",
      data: saveTeamMember,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error. Please try again later.",
    });
  }
});

// Edit the team Member

app.put("/api/v1/editTeamMember/:memberId", adminAuth, async (req, res) => {
  const { name, email, role } = req.body;

  // Validate incoming request
  if (!name && !email && !role) {
    return res.status(400).json({
      status: "error",
      message: "Please provide minimum name,email and role atleast",
    });
  }

  try {
    // Find the team member by ID
    const teamMember = await TeamMember.findById(req.params.memberId);
    if (!teamMember) {
      return res.status(404).json({
        status: "error",
        message: "Team member not found.",
      });
    }

    // Update fields if they exist in the request body
    if (name) teamMember.name = name;
    if (email) teamMember.email = email;
    if (role) teamMember.role = role;

    // Save the updated team member
    await teamMember.save();

    res.status(200).json({
      status: "success",
      message: "Team member updated successfully.",
      data: teamMember,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error. Please try again later.",
    });
  }
});

// Removing the Team Member

app.delete(
  "/api/v1/removeTeamMember/:memberId",
  adminAuth,
  async (req, res) => {
    try {
      // Find the team member by ID and delete
      const teamMember = await TeamMember.findByIdAndDelete(
        req.params.memberId,
      );
      if (!teamMember) {
        return res.status(404).json({
          status: "error",
          message: "Team member not found.",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Team member removed successfully.",
        data: teamMember,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "Internal server error. Please try again later.",
      });
    }
  },
);

// Start the server

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log("connected successfully");
//   console.log(`Server running on port ${port}...`);
// });
