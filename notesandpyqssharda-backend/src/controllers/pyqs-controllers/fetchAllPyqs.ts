import { Request, Response } from "express";
import { Pyq } from "../../models/pyqs/pyq.model.js";

export const fetchAllPyqs = async (req: Request, res: Response) => {
  try {
    const { limit = "10" } = req.query;
    const limitNum = parseInt(limit as string);

    // Fetch only approved pyqs, sorted by creation date (most recent first)
    const pyqs = await Pyq.find({ status: "approved" })
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .populate("userId", "username")
      .lean();

    res.status(200).json({
      success: true,
      pyqs,
      count: pyqs.length,
    });
  } catch (error) {
    console.error("Error fetching recent pyqs:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
