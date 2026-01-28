import { Request, Response } from "express";
import { Pyq } from "../../models/pyqs/pyq.model.js";
import { success } from "zod";

export const uploadPyqs = async (req: Request, res: Response) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const { title, program, courseCode, courseName, semester, year } = req.body;

    const fileUrl = req.file.path; // 🔥 Cloudinary URL
    const publicId = req.file.filename; // 🔥 Cloudinary public_id
    const userId = req.user!.userId; // Fixed: JWT payload uses 'userId' not 'id'
    if (
      !title ||
      !fileUrl ||
      !program ||
      !courseCode ||
      !courseName ||
      !semester ||
      !year
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
    const newPyq = new Pyq({
      title,
      fileUrl,
      userId,
      program,
      courseCode,
      courseName,
      semester,
      year,
      publicId,
    });
    await newPyq.save();
    res.status(201).json({
      success: true,
      message: "Pyq uploaded successfully",
      pyq: newPyq,
    });
  } catch (error) {
    console.error("Error uploading pyq:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
