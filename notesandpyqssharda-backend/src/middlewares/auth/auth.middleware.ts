import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  if (!token) {
    console.log("❌ Auth failed: No access token found in cookies");
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    (req as any).user = decoded;
    console.log(`✅ Auth success: User ${(decoded as any).userId}`);
    next();
  } catch (error) {
    console.log("❌ Auth failed: Invalid or expired token");
    return res.status(401).json({ message: "Invalid token" });
  }
};
export default authMiddleware;
