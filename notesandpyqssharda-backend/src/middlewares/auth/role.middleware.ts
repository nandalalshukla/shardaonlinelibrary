import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // JWT stores role as 'userRole', not 'role'
    const userRole = (req as any).user?.userRole;
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    next();
  };
};
export default roleMiddleware;
