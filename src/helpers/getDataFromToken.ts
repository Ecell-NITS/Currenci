import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("signInToken")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    return decodedToken.id;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
