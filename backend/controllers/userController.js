import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToke.js";
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
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

const regsiterUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(401);
		throw new Error("User already exists");
	}
	const user = await User.create({
		email,
		name,
		password,
	});
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(404);
		throw new Error("Invalid User Data");
	}
});

const getUserProfile = asyncHandler(async (req, res) => {
	// res.send("suvcess");
	const user = await User.findById(req.user._id);
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(401);
		throw new Error("User doesn't exist");
	}
});

const updateUserProfile = asyncHandler(async (req, res) => {
	console.log("suvcess");
	const user = await User.findById(req.user._id);
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}
		const upDatedUser = await user.save();
		res.json({
			_id: upDatedUser._id,
			name: upDatedUser.name,
			email: upDatedUser.email,
			isAdmin: upDatedUser.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("User doesn't exist");
	}
});

const getUsers = asyncHandler(async (req, res) => {
	// res.send("suvcess");
	const users = await User.find({});

	res.json(users );
});

export { authUser, getUserProfile, regsiterUser, updateUserProfile,getUsers };
