//in this controller i want to search from all resources like notes,pyqs,books etc based on the query parameter passed in the request the query parameter will contain type of the resource, title,program,courseCode,courseName, year, semester, query etc this will be a advanced and performance optimized search functionality
import { Request, Response } from "express";
import { Note } from "../../models/notes/notes.model.js";
import { Pyq } from "../../models/pyqs/pyq.model.js";
import { Syllabus } from "../../models/syllabus/syllabus.model.js";
export const searchFromAllResources = async (req: Request, res: Response) => {
  try {
    const { query, type } = req.query;
    if (!query || typeof query !== "string") {
      return res.status(400).json({
        success: false,
        message: "Query parameter is required",
      });
    }
    const regex = new RegExp(query, "i");
    let results: any[] = [];

    // Build search conditions - only use regex for string fields
    const buildSearchQuery = () => {
      const searchConditions: any[] = [
        { title: regex },
        { program: regex },
        { courseCode: regex },
        { courseName: regex },
        { year: regex },
      ];

      // Check if query is a number for semester field
      const numQuery = parseInt(query);
      if (!isNaN(numQuery)) {
        searchConditions.push({ semester: numQuery });
      }

      return { $or: searchConditions };
    };

    if (!type || type === "all" || type === "notes") {
      const notes = await Note.find(buildSearchQuery());
      results = results.concat(notes);
    }
    if (!type || type === "all" || type === "pyqs") {
      const pyqs = await Pyq.find(buildSearchQuery());
      results = results.concat(pyqs);
    }
    if (!type || type === "all" || type === "syllabus") {
      const syllabus = await Syllabus.find(buildSearchQuery());
      results = results.concat(syllabus);
    }
    res.status(200).json({
      results,
    });
  } catch (error) {
    console.error("Error searching resources:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
