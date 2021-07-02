import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
	if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
		const product = await Product.findById(req.params.id);
		console.log(`${product}`.yellow);
		if (product) {
			res.json(product);
		} else {
			res.status(404);
			throw new Error("Product not found");
		}
	} else {
		res.status(404).json({ message: "Invalid product" });
	}
});

export { getProductById, getProducts };
