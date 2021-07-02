import express from "express";
const router = express.Router();
import {
	authUser,
	getUserProfile,
	regsiterUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
//description  : fetch all products

router.post("/login", authUser);
router.post("/", regsiterUser);
router.route("/profile").get(protect, getUserProfile);
export default router;
