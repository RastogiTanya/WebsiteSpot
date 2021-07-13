import express from "express";
const router = express.Router();
import {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	getmyOrders,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
//description  : fetch all products
//console.log("object");
router.post("/", protect, addOrderItems);
// console.log("1");
router.get("/myorders", protect, getmyOrders);
router.get("/:id", protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
