import crypto from "crypto";
import { User } from "../models/users/user.model.js";
import { sendOTPMail } from "./email.js";

async function generateOtp(): Promise<string> {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("Generated OTP:", otp); //for testing purposes only
  return otp;
}

async function hashOtp(otp: string) {
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
  return hashedOtp;
}

async function otpExpiryTime(minutes: number) {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  return now;
}

async function sendAndStoreOtp(email: string): Promise<void> {
  const otp = await generateOtp();
  console.log(`Sending OTP ${otp} to email: ${email}`);

  try {
    await sendOTPMail(email, otp);
    console.log(`✓ OTP email sent successfully to: ${email}`);
  } catch (error) {
    console.error(`✗ Failed to send OTP email to ${email}:`, error);
    throw new Error(
      "Failed to send OTP email. Please check your email configuration.",
    );
  }

  const hashedOtp = await hashOtp(otp);
  const otpExpiry = await otpExpiryTime(3);
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  user.emailOtpHash = hashedOtp;
  user.emailOtpExpiry = otpExpiry;
  await user.save();
}

async function isOtpExpired(expiryTime: Date) {
  return new Date() > expiryTime;
}

async function verifyOtp(otp: string, hashedOtp: string): Promise<boolean> {
  const expiryTime = await otpExpiryTime(100000);
  const hashedInputOtp = await hashOtp(otp);
  console.log("Hashed Input OTP:", hashedInputOtp);
  console.log("Stored Hashed OTP:", hashedOtp);
  console.log("OTP Expiry Time:", expiryTime);
  console.log("Is OTP valid:", hashedInputOtp === hashedOtp);
  console.log("Is OTP expired:", await isOtpExpired(expiryTime));
  const otpExpired = await isOtpExpired(expiryTime);
  return hashedInputOtp === hashedOtp && !otpExpired;
}

export { verifyOtp, sendAndStoreOtp, generateOtp };
