import express from "express";
const router = express.Router();

import {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	getmyOrders,
	getOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
//description  : fetch all products
//console.log("object");
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
// console.log("1");
router.get("/myorders", protect, getmyOrders);
router.get("/:id", protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
