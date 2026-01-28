//handle admin related pyq management
import { Request, Response } from "express";
import { Pyq } from "../../models/pyqs/pyq.model.js";

//fetch approved pyqs
export const fetchApprovedPyqs = async (req: Request, res: Response) => {
    try {
        const pyqs = await Pyq.find({ status: 'approved' }).lean();
        res.status(200).json({ success: true, pyqs });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch pyqs" });
    }
};


//delete a pyq that is already approved
export const deletePyq = async (req: Request, res: Response) => {
    const { pyqId } = req.params;
    try {
        const pyq = await Pyq.findByIdAndDelete(pyqId);
        if (!pyq) {
            return res.status(404).json({ success: false, message: 'Pyq not found' });
        }
        return res.status(200).json({ success: true, message: 'Pyq deleted successfully' });
    } catch (error) {
        console.error('Error in deleting pyq:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};