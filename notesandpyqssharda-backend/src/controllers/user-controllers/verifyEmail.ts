import { Request, Response } from "express";
import { verifyOtp } from "../../utils/Otp.js";
import { User } from "../../models/users/user.model.js";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../../config/cookies.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateJwtTokens.js";

export default async function verifyEmail(req: Request, res: Response) {

  const { email, otp } = req.body;
  const secret = process.env.VERIFY_EMAIL_TOKEN_SECRET;

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      message: "email and OTP are required",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (!user.emailOtpHash) {
    return res.status(400).json({
      success: false,
      message: "OTP expired or not found",
    });
  }


  const isValidOtp = await verifyOtp(otp.toString(), user.emailOtpHash);

  if (!isValidOtp) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }
  try {
    const accessToken = generateAccessToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString());

    user.isEmailVerified = true;
    user.refreshToken = refreshToken;
    user.emailOtpHash = undefined;
    await user.save();

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
        },
      },
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Error generating tokens:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
