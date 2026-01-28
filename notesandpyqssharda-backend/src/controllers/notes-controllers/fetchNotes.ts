import { Request, Response } from "express";
import { Note } from "../../models/notes/notes.model.js";

export const fetchAllNotes = async (req: Request, res: Response) => {
  try {
    const { limit = "10" } = req.query;
    const limitNum = parseInt(limit as string);

    // Fetch only approved notes, sorted by creation date (most recent first)
    const notes = await Note.find({ status: "approved" })
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .populate("userId", "username")
      .lean();

    res.status(200).json({
      success: true,
      notes,
      count: notes.length,
    });
  } catch (error) {
    console.error("Error fetching recent notes:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
