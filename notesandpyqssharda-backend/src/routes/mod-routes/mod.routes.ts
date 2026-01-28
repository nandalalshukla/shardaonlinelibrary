//all moderator routes
import { Router } from "express";
import {
  fetchPendingNotes,
  approveNote,
  rejectNote,
} from "../../controllers/mod-controllers/notesManagement.js";
import {
  fetchPendingPyqs,
  approvePyq,
  rejectPyq,
} from "../../controllers/mod-controllers/pyqManagement.js";
import {
  fetchPendingSyllabus,
  approveSyllabus,
  rejectSyllabus,
} from "../../controllers/mod-controllers/syllabusManagement.js";
import { authMiddleware } from "../../middlewares/auth/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/auth/role.middleware.js";

const router = Router();

//apply auth and mod role middleware to all routes
router.use(authMiddleware, roleMiddleware("mod", "admin"));
//notes management routes
router.get("/notes/pending", fetchPendingNotes);
router.patch("/notes/:noteId/approve", approveNote);
router.patch("/notes/:noteId/reject", rejectNote);

//pyq management routes
router.get("/pyqs/pending", fetchPendingPyqs);
router.patch("/pyqs/:pyqId/approve", approvePyq);
router.patch("/pyqs/:pyqId/reject", rejectPyq);

//syllabus management routes
router.get("/syllabus/pending", fetchPendingSyllabus);
router.patch("/syllabus/:syllabusId/approve", approveSyllabus);
router.patch("/syllabus/:syllabusId/reject", rejectSyllabus);

export default router;
