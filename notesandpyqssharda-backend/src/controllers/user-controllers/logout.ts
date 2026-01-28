import { Request, Response } from "express";
import { User } from "../../models/users/user.model.js";

export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    // Best-effort DB cleanup (optional)
    if (refreshToken) {
      await User.updateOne({ refreshToken }, { $unset: { refreshToken: "" } });
    }

    // Always clear cookies
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true in production
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Error in logout:", error);

    // Still return success (logout is cleanup)
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  }
};

export default logout;
