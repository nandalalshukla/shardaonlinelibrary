//forgot password controller
import { User } from "../../models/users/user.model.js";
import { Request, Response } from "express";
import { sendAndStoreOtp } from "../../utils/Otp.js";

export const forgetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
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
    await sendAndStoreOtp(user.email);
    return res.status(200).json({
      success: true,
      message:
        "If an account exists, a password reset OTP has been sent to your email.",
    });
  } catch (error) {
    console.error("Error in forget password:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default forgetPassword;
