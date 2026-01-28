//change password controller
import { User } from "../../models/users/user.model.js";
import { Request, Response } from "express";
import { hashPassword } from "../../utils/hashPassword.js";
import { verifyOtp } from "../../utils/Otp.js";

export const createNewPassword = async (req: Request, res: Response) => {
  const { email, otp, newPassword, confirmNewPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Token, OTP and new password are required",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedOtp = user.emailOtpHash;
    if (!hashedOtp) {
      return res.status(400).json({
        success: false,
        message: "No OTP found for this user, please request a new one",
      });
    }
    const isOtpValid = await verifyOtp(otp, hashedOtp);
    if (!isOtpValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }
    const hashedNewPassword = await hashPassword(newPassword);
    user.password = hashedNewPassword;
    user.emailOtpHash = undefined;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error in change password:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default createNewPassword;
