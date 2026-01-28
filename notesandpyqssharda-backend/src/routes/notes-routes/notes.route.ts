import { Router } from "express";
import { uploadNotes } from "../../controllers/notes-controllers/uploadNotes.js";
import { editNotes } from "../../controllers/notes-controllers/editNotes.js";
import { searchNotes } from "../../controllers/notes-controllers/searchNotes.js";
import { deleteNotes } from "../../controllers/notes-controllers/deleteNotes.js";
import { fetchSpecificUserNotes } from "../../controllers/notes-controllers/specificUserNotes.js";
import { fetchAllNotes } from "../../controllers/notes-controllers/fetchNotes.js";
import { uploadNotesMulter } from "../../config/multer.js";
import { authMiddleware } from "../../middlewares/auth/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, uploadNotesMulter.single("file"), uploadNotes);
router.put("/:id", authMiddleware, editNotes);
router.delete("/:id", authMiddleware, deleteNotes);
router.get("/search-notes", searchNotes);
router.get("/my-notes", authMiddleware, fetchSpecificUserNotes);
router.get("/all-notes", fetchAllNotes);

export default router;
