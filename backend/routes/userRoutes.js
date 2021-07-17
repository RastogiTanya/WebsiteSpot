import express from "express";
const router = express.Router();
import {
	authUser,
	getUserProfile,
	regsiterUser,
	updateUserProfile,
	getUsers,
	deleteUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
//description  : fetch all products

router.route("/").post(regsiterUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);
router.route("/:id").delete(protect, admin, deleteUser);
export default router;
