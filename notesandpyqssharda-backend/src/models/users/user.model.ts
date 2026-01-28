import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@ug\.sharda\.ac\.in$/,
        "Only sharda university emails are allowed",
      ],
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // 🔐 never return password
    },
    
    contributions: {
      type: Number,
      default: 0,
    },
    
    passwordChangedAt: Date,

    role: {
      type: String,
      enum: ["user", "mod", "admin"],
      default: "user",
    },

    isActive: {
      type: Boolean,
      default: true,
      select: false,
    },
    
    modRequest: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: null,
    },

    contactNo: {
      type: String,
      trim: true,
      default: null,
    },

    modRequestAt: {
      type: Date,
      default: null,
    },

    modMotivation: {
      type: String,
      trim: true,
      default: null,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailOtpHash: {
      type: String,
    },

    emailOtpExpiry: {
      type: Date,
    },

    forgotPasswordToken: {
      type: String,
      select: false,
    },

    forgotPasswordExpiry: Date,

    refreshToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
