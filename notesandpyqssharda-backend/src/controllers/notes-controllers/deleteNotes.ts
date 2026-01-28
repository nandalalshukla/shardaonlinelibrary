import { Request, Response } from "express";
import { Note } from "../../models/notes/notes.model.js";
import cloudinary from "../../config/cloudinary.js";

export const deleteNotes = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id;
    const userId = req.user!.userId;
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
        message: "Forbidden: You can only delete your own notes",
      });
    }
    
    await cloudinary.uploader.destroy(note.publicId, {
      resource_type: "raw",
    });
    await Note.findByIdAndDelete(noteId);
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
