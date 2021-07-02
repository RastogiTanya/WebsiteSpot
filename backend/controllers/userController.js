import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToke.js";
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		res.json({
			id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid credentials");
	}
});

const getUserProfile = asyncHandler(async (req, res) => {
	res.send("suvcess");
});

export { authUser, getUserProfile };
