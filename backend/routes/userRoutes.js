import express from "express";
const router = express.Router();
import {
	authUser,
	getUserProfile,
	regsiterUser,
	updateUserProfile,
	getUsers,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
//description  : fetch all products

router.route("/").post(regsiterUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

export default router;
