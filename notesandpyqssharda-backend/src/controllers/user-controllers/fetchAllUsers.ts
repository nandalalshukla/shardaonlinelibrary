import { Request, Response } from "express";
import { User } from "../../models/users/user.model.js";

export const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, "-password -__v").lean();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};
