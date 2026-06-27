import express from "express";

import {
  getProspects,
  addProspect,
} from "../controllers/prospectController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getProspects);
router.post("/", protect, addProspect);

export default router;