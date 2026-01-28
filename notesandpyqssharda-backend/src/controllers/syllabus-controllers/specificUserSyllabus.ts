import { Request, Response } from "express";
import { Syllabus } from "../../models/syllabus/syllabus.model.js";

export const fetchSpecificUserSyllabus = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const syllabus = await Syllabus.find({ userId }).sort({ createdAt: -1 });
    console.log("specifi users syllabus", syllabus)
    res.status(200).json({
      success: true,
      syllabus,
    });
  } catch (error) {
    console.error("Error fetching user pyqs:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
