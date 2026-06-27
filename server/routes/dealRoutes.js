import express from "express";
import {
  getDeals,
  addDeal,
} from "../controllers/dealController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getDeals);
router.post("/", protect, addDeal);

export default router;