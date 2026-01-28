import mongoose, { Schema } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },


    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },

    program: {
      type: String,
      required: true,
      trim: true,
    },

    courseCode: {
      type: String,
      required: true,
      trim: true,
    },

    courseName: {
      type: String,
      required: true,
      trim: true,
    },

    semester: {
      type: Number,
      required: true,
    },

    //MODERATION SYSTEM
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    approvedBy: {
      type: ObjectId,
      ref: "User",
      default: null,
    },

    approvedAt: {
      type: Date,
      default: null,
    },

    rejectedBy: {
      type: ObjectId,
      ref: "User",
      default: null,
    },

    rejectedAt: {
      type: Date,
      default: null,
    },

    rejectionReason: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export const Note = mongoose.model("Note", noteSchema, "notes");
