import express from "express";
const router = express.Router();
import {
	authUser,
	getUserProfile,
	regsiterUser,
	updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
//description  : fetch all products

router.post("/login", authUser);
router.post("/", regsiterUser);
router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

export default router;
