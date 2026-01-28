//all admin routes
import { Router } from "express";
import {
  fetchApprovedNotes,
  deleteNote,
} from "../../controllers/admin-controllers/notesManagement.js";
import {
  fetchApprovedPyqs,
  deletePyq,
} from "../../controllers/admin-controllers/pyqManagement.js";
import {
  fetchApprovedSyllabus,
  deleteSyllabus,
} from "../../controllers/admin-controllers/syllabusManagement.js";
import {
  fetchAllUsers,
  deleteUser,
  deactivateUser,
  activateUser,
  fetchActiveUsers,
  fetchInactiveUsers,
} from "../../controllers/admin-controllers/userManagement.js";
import {
  fetchAllMods,
  fetchModRequests,
  removeModRole,
  reviewModRequest,
} from "../../controllers/admin-controllers/modManagement.js";
import { authMiddleware } from "../../middlewares/auth/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/auth/role.middleware.js";

const router = Router();

//all routes here will be protected and will start with /admin
router.use(authMiddleware);
router.use(roleMiddleware("admin"));

//notes management routes
router.get("/notes", fetchApprovedNotes);
router.delete("/notes/:noteId", deleteNote);

//pyq management routes
router.get("/pyqs", fetchApprovedPyqs);
router.delete("/pyqs/:pyqId", deletePyq);

//syllabus management routes
router.get("/syllabus", fetchApprovedSyllabus);
router.delete("/syllabus/:syllabusId", deleteSyllabus);

//user management routes
router.get("/users/active", fetchActiveUsers);
router.get("/users/inactive", fetchInactiveUsers);
router.get("/users", fetchAllUsers);
router.delete("/users/:userId", deleteUser);
router.patch("/users/deactivate/:userId", deactivateUser);
router.patch("/users/activate/:userId", activateUser);

//moderator management routes
router.get("/mods/requests", fetchModRequests);
router.get("/mods", fetchAllMods);
router.patch("/mods/review/:userId", reviewModRequest);
router.patch("/mods/remove/:userId", removeModRole);

export default router;
