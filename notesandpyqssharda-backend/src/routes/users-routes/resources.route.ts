//create routes for searching resources

import { Router } from "express";
import { searchFromAllResources } from "../../controllers/user-controllers/searchFromAllResources.js";

//no auth required
const router = Router();
router.get("/search", searchFromAllResources);

export default router;
