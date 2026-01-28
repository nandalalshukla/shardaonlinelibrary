import { Request, Response } from "express";
import { Note } from "../../models/notes/notes.model.js";
import { User } from "../../models/users/user.model.js";
import { contentRejectionMail } from "../../utils/email.js";
import { contentApprovalMail } from "../../utils/email.js";

//fetch all notes pending approval
export const fetchPendingNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({ status: "pending" })
      .populate("userId", "name email username")
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error("Error fetching pending notes:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch pending notes" });
  }
};

//reject a note pending approval
export const rejectNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const { rejectionReason } = req.body;
  try {
    if (!rejectionReason || rejectionReason.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Rejection reason is required" });
    }

    const note = await Note.findOne({ status: "pending", _id: noteId });
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    const user = await User.findById(note.userId.toString());
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Use findByIdAndUpdate to avoid validation errors on unchanged fields
    await Note.findByIdAndUpdate(noteId, {
      status: "rejected",
      rejectionReason: rejectionReason,
      rejectedAt: new Date(),
      rejectedBy: req.user!.userId,
    });

    // Send email asynchronously (non-blocking) - don't await
    contentRejectionMail(user.email, user.name, "note", rejectionReason).catch(
      (err) => {
        console.error("Failed to send rejection email:", err);
      },
    );

    return res
      .status(200)
      .json({ success: true, message: "Note rejected successfully" });
  } catch (error) {
    console.error("Error in rejecting note:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//approve a note pending approval
export const approveNote = async (req: Request, res: Response) => {
  const { noteId } = req.params;
  try {
    const note = await Note.findOne({ status: "pending", _id: noteId });
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    const user = await User.findById(note.userId.toString());
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Use findByIdAndUpdate to avoid validation errors on unchanged fields
    await Note.findByIdAndUpdate(noteId, {
      status: "approved",
      approvedAt: new Date(),
      approvedBy: req.user!.userId,
    });

    // Send email asynchronously (non-blocking) - don't await
    contentApprovalMail(user.email, user.name, "note").catch((err) => {
      console.error("Failed to send approval email:", err);
    });

    return res
      .status(200)
      .json({ success: true, message: "Note approved successfully" });
  } catch (error) {
    console.error("Error in approving note:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
