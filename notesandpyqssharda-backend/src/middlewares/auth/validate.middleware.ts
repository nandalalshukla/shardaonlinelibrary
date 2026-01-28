import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validateMiddleware =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        errors: error.errors,
      });
    }
  };
