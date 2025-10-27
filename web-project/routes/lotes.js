// routes/lotes.js
import express from "express";
import { getLotes, createLote } from "../controllers/lotesController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getLotes);
router.post("/", verifyToken, createLote);

export default router;
