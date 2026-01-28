//admin will manage all the notes via this controller

import { Request, Response } from "express";
import { Note } from "../../models/notes/notes.model.js";

//fetch approved notes
export const fetchApprovedNotes = async (req: Request, res: Response) => {
    try {
        const notes = await Note.find({ status: 'approved' }).lean();
        res.status(200).json({ success: true, notes });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch notes" });
    }
};

//delete a note
export const deleteNote = async (req: Request, res: Response) => {
    const { noteId } = req.params;
    try {
        const note = await Note.findByIdAndDelete(noteId);
        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }
        return res.status(200).json({ success: true, message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error in deleting note:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

