//controller that will fetch all the notes uploaded by a specific user
import { Request, Response } from "express";
import { Note } from "../../models/notes/notes.model.js";

export const fetchSpecificUserNotes = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const notes = await Note.find({ userId }).sort({ createdAt: -1 });
    console.log("specific user notes",notes);
    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.error("Error fetching user notes:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
