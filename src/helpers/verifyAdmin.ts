import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "../model/User";

const JWT_SECRET = process.env.JWT_TOKEN_SECRET;

export async function isAdmin(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("No or invalid authorization header");
    return false;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      console.error("User not found");
      return false;
    }
    const isReqAdmin = user.role === "admin" || user.role === "superadmin";
    console.log("isReqAdmin", isReqAdmin);
    return isReqAdmin;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.error("Token has expired");
    } else if (error.name === "JsonWebTokenError") {
      console.error("Invalid token");
    } else {
      console.error("Error verifying token:", error);
    }
    return false;
  }
}

export async function isSuperAdmin(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("No or invalid authorization header");
    return false;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      console.error("User not found");
      return false;
    }
    const isReqSuperAdmin = user.role === "superadmin";
    console.log("isReqSuperAdmin", isReqSuperAdmin);
    return isReqSuperAdmin;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.error("Token has expired");
    } else if (error.name === "JsonWebTokenError") {
      console.error("Invalid token");
    } else {
      console.error("Error verifying token:", error);
    }
    return false;
  }
}
