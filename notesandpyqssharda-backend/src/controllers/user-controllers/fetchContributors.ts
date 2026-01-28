import { Request, Response } from "express";
import { User } from "../../models/users/user.model.js";

export const fetchContributors = async (req: Request, res: Response) => {
  try {
    const contributors = await User.find({ contributions: { $gt: 0 } })
      .select("name email contributions createdAt")
      .sort({ contributions: -1 })
      .limit(50)
      .lean();

    res.status(200).json({
      success: true,
      contributors,
    });
  } catch (error) {
    console.error("Error fetching contributors:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
