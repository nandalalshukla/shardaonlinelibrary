import { Request, Response } from "express";
import { Syllabus } from "../../models/syllabus/syllabus.model.js";

export const uploadSyllabus = async (req: Request, res: Response) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const { title, program, courseCode, courseName, semester } = req.body;

    const fileUrl = req.file.path; // 🔥 Cloudinary URL
    const publicId = req.file.filename; // 🔥 Cloudinary public_id
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
    const newSyllabus = new Syllabus({
      title,
      fileUrl,
      userId,
      program,
      courseCode,
      courseName,
      semester,
      publicId,
    });
    await newSyllabus.save();
    res.status(201).json({
      success: true,
      message: "Syllabus uploaded successfully",
      syllabus: newSyllabus,
    });
  } catch (error) {
    console.error("Error uploading syllabus:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
