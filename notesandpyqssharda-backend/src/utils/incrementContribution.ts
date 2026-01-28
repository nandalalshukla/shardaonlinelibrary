import { User } from "../models/users/user.model.js";

export const incrementContribution = async (userId: string) => {
  await User.findByIdAndUpdate(userId, { $inc: { contributions: 1 } });
};

export const deacrementContribution = async (userId: string) => {
  await User.findByIdAndUpdate(userId, { $inc: { contributions: -1 } });
};

