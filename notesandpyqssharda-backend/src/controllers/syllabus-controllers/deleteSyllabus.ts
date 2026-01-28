import { Request, Response } from "express";
import { Syllabus } from "../../models/syllabus/syllabus.model.js";
import cloudinary from "../../config/cloudinary.js";

export const deleteSyllabus = async (req: Request, res: Response) => {
  try {
    const syllabusId = req.params.id;
    const userId = req.user!.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const syllabus = await Syllabus.findById(syllabusId);
    if (!syllabus) {
      return res.status(404).json({
        success: false,
        message: "Syllabus not found",
      });
    }
    if (syllabus.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You can only delete your own syllabus",
      });
    }
    await cloudinary.uploader.destroy(syllabus.publicId, {
      resource_type: "raw",
    });
    await Syllabus.findByIdAndDelete(syllabusId);
    res.status(200).json({
      success: true,
      message: "Syllabus deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting syllabus:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
