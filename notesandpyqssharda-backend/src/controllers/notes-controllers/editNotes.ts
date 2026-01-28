import { Request, Response } from "express";
import { Note } from "../../models/notes/notes.model.js";
import cloudinary from "../../config/cloudinary.js";

export const editNotes = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;
    const { title, fileUrl, program, courseCode, courseName, semester } =
      req.body;
    const userId = req.user!.userId;
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
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    if (note.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You can only edit your own notes",
      });
    }
    // If a new file is uploaded, delete the old file from Cloudinary and upload the new one
    if (fileUrl !== note.fileUrl) {
      await cloudinary.uploader.destroy(note.publicId, {
        resource_type: "raw",
      });
      const uploadResult = await cloudinary.uploader.upload(fileUrl, {
        resource_type: "raw",
      });
      note.publicId = uploadResult.public_id;
      note.fileUrl = uploadResult.secure_url;
    }

    note.title = title;
    note.fileUrl = fileUrl;
    note.program = program;
    note.courseCode = courseCode;
    note.courseName = courseName;
    note.semester = semester;
    await note.save();
    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    console.error("Error editing note:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
