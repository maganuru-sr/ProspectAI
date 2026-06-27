import express from "express";

import {
  getLeads,
  addLead,
} from "../controllers/leadController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getLeads);
router.post("/", protect, addLead);

export default router;