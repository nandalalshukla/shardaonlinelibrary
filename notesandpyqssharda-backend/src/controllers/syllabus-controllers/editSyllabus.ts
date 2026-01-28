import { Request, Response } from "express";
import { Syllabus } from "../../models/syllabus/syllabus.model.js";
import cloudinary from "../../config/cloudinary.js";

export const editSyllabus = async (req: Request, res: Response) => {
  try {
    const syllabusId = req.params.id;
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
        message: "Forbidden: You can only edit your own syllabus",
      });
    }

// If a new file is uploaded, delete the old file from Cloudinary and upload the new one
let uploadResult: any;
if (fileUrl !== syllabus.fileUrl) {
  await cloudinary.uploader.destroy(syllabus.publicId, {
    resource_type: "raw",
  });
  uploadResult = await cloudinary.uploader.upload(fileUrl, {
    resource_type: "raw",
  });
}

if (uploadResult) {
  syllabus.publicId = uploadResult.public_id;
  syllabus.fileUrl = uploadResult.secure_url;
}
    syllabus.title = title;
syllabus.fileUrl = uploadResult.secure_url;
    syllabus.program = program;
    syllabus.courseCode = courseCode;
    syllabus.courseName = courseName;
    syllabus.semester = semester;
    await syllabus.save();
    res.status(200).json({
      success: true,
      message: "Syllabus updated successfully",
      syllabus,
    });
  } catch (error) {
    console.error("Error editing syllabus:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
