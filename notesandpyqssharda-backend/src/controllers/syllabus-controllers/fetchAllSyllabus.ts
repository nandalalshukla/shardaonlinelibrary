//fetch all syllabus
import { Request, Response } from "express";
import { Syllabus } from "../../models/syllabus/syllabus.model.js";

export const fetchAllSyllabus = async (req: Request, res: Response) => {
  try {
    const { limit = "10" } = req.query;
    const limitNum = parseInt(limit as string);

    // Fetch only approved syllabus, sorted by creation date (most recent first)
    const syllabuses = await Syllabus.find({ status: "approved" })
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .populate("userId", "username")
      .lean();

    res.status(200).json({
      success: true,
      syllabuses,
      count: syllabuses.length,
    });
  } catch (error) {
    console.error("Error fetching syllabuses:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
