//handle user request to become a moderator
import { Request, Response } from "express";
import { User } from "../../models/users/user.model.js";

export const becomeModerator = async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const {contactNo, motivation } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        user.contactNo = contactNo;
        user.modMotivation = motivation;
        user.modRequest = "pending";
        user.modRequestAt = new Date();
        
        
        await user.save();
        return res.status(200).json({ success: true, message: 'Moderator request submitted successfully' });
    } catch (error) {
        console.error('Error in become moderator:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};