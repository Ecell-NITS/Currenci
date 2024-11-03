/* eslint-disable import/no-unresolved */
/* eslint-disable no-restricted-exports */

export { default } from "next-auth/middleware";

const jwt = require("jsonwebtoken");

// Middleware to check if the user is authenticated and is an admin
export async function adminAuth(req, res, next) {
  const token = await req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    // Check if the user has an admin role
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
  return next();
}
