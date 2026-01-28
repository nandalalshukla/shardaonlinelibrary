import { Request, Response } from "express";
import { Pyq } from "../../models/pyqs/pyq.model.js";
import { User } from "../../models/users/user.model.js";
import {
  contentRejectionMail,
  contentApprovalMail,
} from "../../utils/email.js";

//fetch pending pyqs for moderator review
export const fetchPendingPyqs = async (req: Request, res: Response) => {
  try {
    const pyqs = await Pyq.find({ status: "pending" })
      .populate("userId", "name email username")
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json({ success: true, pyqs });
  } catch (error) {
    console.error("Error fetching pending pyqs:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch pending pyqs" });
  }
};

//reject a pyq pending approval
export const rejectPyq = async (req: Request, res: Response) => {
  const { pyqId } = req.params;
  const { rejectionReason } = req.body;
  try {
    if (!rejectionReason || rejectionReason.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Rejection reason is required" });
    }

    const pyq = await Pyq.findOne({ status: "pending", _id: pyqId });
    if (!pyq) {
      return res.status(404).json({ success: false, message: "Pyq not found" });
    }

    const user = await User.findById(pyq.userId.toString());
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Use findByIdAndUpdate to avoid validation errors on unchanged fields
    await Pyq.findByIdAndUpdate(pyqId, {
      status: "rejected",
      rejectionReason: rejectionReason,
      rejectedAt: new Date(),
      rejectedBy: req.user!.userId,
    });

    // Send email asynchronously (non-blocking) - don't await
    contentRejectionMail(user.email, user.name, "pyq", rejectionReason).catch(
      (err) => {
        console.error("Failed to send rejection email:", err);
      },
    );

    return res
      .status(200)
      .json({ success: true, message: "Pyq rejected successfully" });
  } catch (error) {
    console.error("Error in rejecting pyq:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const approvePyq = async (req: Request, res: Response) => {
  const { pyqId } = req.params;
  try {
    const pyq = await Pyq.findOne({ status: "pending", _id: pyqId });
    if (!pyq) {
      return res.status(404).json({ success: false, message: "Pyq not found" });
    }

    const user = await User.findById(pyq.userId.toString());
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Use findByIdAndUpdate to avoid validation errors on unchanged fields
    await Pyq.findByIdAndUpdate(pyqId, {
      status: "approved",
      approvedAt: new Date(),
      approvedBy: req.user!.userId,
    });

    // Send email asynchronously (non-blocking) - don't await
    contentApprovalMail(user.email, user.name, "pyq").catch((err) => {
      console.error("Failed to send approval email:", err);
    });

    return res
      .status(200)
      .json({ success: true, message: "Pyq approved successfully" });
  } catch (error) {
    console.error("Error in approving pyq:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
