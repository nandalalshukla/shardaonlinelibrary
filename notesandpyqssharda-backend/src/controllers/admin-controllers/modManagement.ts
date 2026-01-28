//admin will manage all the moderators via this controller

import { Request, Response } from "express";
import { User } from "../../models/users/user.model.js";
import {
  moderatorRejectionMail,
  moderatorApprovalMail,
} from "../../utils/email.js";

export const fetchModRequests = async (req: Request, res: Response) => {
  try {
    const mods = await User.find(
      { modRequest: "pending", role: "user" },
      "-password -__v"
    ).lean();
    res.status(200).json({ success: true, mods });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch moderator requests" });
  }
};

//approve or reject mod request
export const reviewModRequest = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { action } = req.body; // 'approve' or 'reject'
  try {
    const user = await User.findById(userId);
    if (!user || !user.modRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Mod request not found" });
    }
    if (action === "approve") {
      user.role = "mod";
      user.modRequest = "approved";
      await user.save();
      //send approval email
      await moderatorApprovalMail(user.email, user.name);
      return res.status(200).json({
        success: true,
        message: "Moderator request approved successfully",
      });
    } else if (action === "reject") {
      user.modRequest = "rejected";
      await user.save();
      //send rejection email
      await moderatorRejectionMail(user.email, user.name);
      return res.status(200).json({
        success: true,
        message: "Moderator request rejected successfully",
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid action" });
    }
  } catch (error) {
    console.error("Error in reviewing mod request:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//fetch all the mods

export const fetchAllMods = async (req: Request, res: Response) => {
  try {
    const mods = await User.find({ role: "mod" }, "-password -__v").lean();
    res.status(200).json({ success: true, mods });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch moderators" });
  }
};

//remove mod role from a user
export const removeModRole = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne(
      { _id: userId, role: "mod" },
      "-password -__v"
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.role = "user";

    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Moderator role removed successfully" });
  } catch (error) {
    console.error("Error in removing moderator role:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
