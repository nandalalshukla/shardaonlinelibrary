import { Note } from "../../models/notes/notes.model.js";
import { Request, Response } from "express";

export const uploadNotes = async (req: Request, res: Response) => {
  try {

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const { title, program, courseCode, courseName, semester } = req.body;

    const fileUrl = req.file.path; // 🔥Cloudinary URL
    const publicId = req.file.filename; // 🔥Cloudinary public_id
    const userId = req.user!.userId; // Fixed: JWT payload uses 'userId' not 'id'

  

    if (
      !title ||
      !fileUrl ||
      !program ||
      !courseCode ||
      !courseName ||
      !semester
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const newNote = new Note({
      title,
      fileUrl,
      userId,
      program,
      courseCode,
      courseName,
      semester,
      publicId,
    });
    await newNote.save();
    res.status(201).json({
      success: true,
      message: "Note uploaded successfully",
      note: newNote,
    });
  } catch (error) {
    console.error("Error uploading note:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
