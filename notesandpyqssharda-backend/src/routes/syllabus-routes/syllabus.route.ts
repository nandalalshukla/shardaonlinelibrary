import { deleteSyllabus } from "../../controllers/syllabus-controllers/deleteSyllabus.js";
import { editSyllabus } from "../../controllers/syllabus-controllers/editSyllabus.js";
import { uploadSyllabus } from "../../controllers/syllabus-controllers/uploadSyllabus.js";
import { searchSyllabus } from "../../controllers/syllabus-controllers/searchSyllabus.js";
import { fetchSpecificUserSyllabus } from "../../controllers/syllabus-controllers/specificUserSyllabus.js";
import { fetchAllSyllabus } from "../../controllers/syllabus-controllers/fetchAllSyllabus.js";
import { authMiddleware } from "../../middlewares/auth/auth.middleware.js";
import { uploadSyllabusMulter } from "../../config/multer.js";

import { Router } from "express";

const router = Router();

router.get("/my-syllabus", authMiddleware, fetchSpecificUserSyllabus);
router.get("/all-syllabus", fetchAllSyllabus);
router.post(
  "/upload-syllabus",
  authMiddleware,
  uploadSyllabusMulter.single("file"),
  uploadSyllabus,
);
router.put("/edit-syllabus/:id", authMiddleware, editSyllabus);
router.delete("/delete-syllabus/:id", authMiddleware, deleteSyllabus);
router.get("/search-syllabus", searchSyllabus);

export default router;
