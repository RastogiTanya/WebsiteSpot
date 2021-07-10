import express from "express";
const router = express.Router();
import { addOrderItems, getOrderById } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
//description  : fetch all products
//console.log("object");
router.post("/", protect, addOrderItems);
// console.log("1");
router.get("/:id", protect, getOrderById);

export default router;

