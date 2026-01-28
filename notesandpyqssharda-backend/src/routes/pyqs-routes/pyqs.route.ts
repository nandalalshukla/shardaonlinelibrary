import { Router } from "express";
import { editPyqs } from "../../controllers/pyqs-controllers/editPyqs.js";
import { uploadPyqs } from "../../controllers/pyqs-controllers/uploadPyqs.js";
import { searchPyqs } from "../../controllers/pyqs-controllers/searchPyqs.js";
import { deletePyqs } from "../../controllers/pyqs-controllers/deletePyqs.js";
import { fetchSpecificUserPyqs } from "../../controllers/pyqs-controllers/specificUserPyqs.js";
import { fetchAllPyqs } from "../../controllers/pyqs-controllers/fetchAllPyqs.js";
import { authMiddleware } from "../../middlewares/auth/auth.middleware.js";
import { uploadPyqsMulter } from "../../config/multer.js";

const router = Router();
router.get("/my-pyqs", authMiddleware, fetchSpecificUserPyqs);
router.get("/all-pyqs", fetchAllPyqs);
router.post(
  "/upload-pyqs",
  authMiddleware,
  uploadPyqsMulter.single("file"),
  uploadPyqs,
);
router.put("/edit-pyqs/:id", authMiddleware, editPyqs);
router.delete("/delete-pyqs/:id", authMiddleware, deletePyqs);
router.get("/search-pyqs", searchPyqs);

export default router;
