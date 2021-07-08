import express from "express";
const router = express.Router();
import { addOrderItems } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
//description  : fetch all products

router.post("/", protect, addOrderItems);

export default router;
