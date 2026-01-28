import { Request, Response } from "express";
import { Pyq } from "../../models/pyqs/pyq.model.js";

export const searchPyqs = async (req: Request, res: Response) => {
  try {
    const { query, program, courseCode, semester, year } = req.query;

    // Query parameter is now optional, if not provided return filtered pyqs
    if (query && typeof query !== "string") {
      return res.status(400).json({
        success: false,
        message: "Query parameter must be a string",
      });
    }

    // Build filter conditions
    const filterConditions: any = {
      status: "approved", // Only search approved pyqs
    };

    // Add text search if query is provided
    if (query && typeof query === "string") {
      const regex = new RegExp(query, "i");
      const searchConditions: any[] = [
        { title: regex },
        { program: regex },
        { courseCode: regex },
        { courseName: regex },
      ];

      // Check if query is a number for semester field
      const numQuery = parseInt(query);
      if (!isNaN(numQuery)) {
        searchConditions.push({ semester: numQuery });
      }

      filterConditions.$or = searchConditions;
    }

    // Add additional filters if provided
    if (program && typeof program === "string") {
      filterConditions.program = new RegExp(program, "i");
    }

    if (courseCode && typeof courseCode === "string") {
      filterConditions.courseCode = new RegExp(courseCode, "i");
    }

    if (semester && typeof semester === "string") {
      const semesterNum = parseInt(semester);
      if (!isNaN(semesterNum)) {
        filterConditions.semester = semesterNum;
      }
    }

    if (year && typeof year === "string") {
      filterConditions.year = new RegExp(year, "i");
    }

    const pyqs = await Pyq.find(filterConditions)
      .sort({ createdAt: -1 })
      .populate("userId", "username")
      .lean();

    res.status(200).json({
      success: true,
      pyqs,
      count: pyqs.length,
    });
  } catch (error) {
    console.error("Error searching pyqs:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
