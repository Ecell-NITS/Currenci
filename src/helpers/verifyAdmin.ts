import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "../model/User";

const JWT_SECRET = process.env.JWT_TOKEN_SECRET;

export async function isAdmin(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return false;
    }
    const isReqAdmin = user.role === "admin" || "superadmin";
    console.log("isReqAdmin", isReqAdmin);
    return isReqAdmin;
  } catch (error) {
    console.error("Invalid or expired token:", error);
    return false;
  }
}

export async function isSuperAdmin(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return false;
    }
    const isReqAdmin = user.role === "superadmin";
    console.log("isReqAdmin", isReqAdmin);
    return isReqAdmin;
  } catch (error) {
    console.error("Invalid or expired token:", error);
    return false;
  }
}
