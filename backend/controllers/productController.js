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

const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({
			message: "Product removed",
		});
		//res.json(product);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: "Sample name",
		price: 0,
		user: req.user._id,
		image: "/images/sample.jpeg",
		brand: "Sample brand",
		category: "Sample ",
		countInStock: 0,
		numReviews: 0,
		description: "Sample desc",
	});
	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		description,
		image,
		brand,
		category,
		//numReviews,
		countInStock,
	} = req.body;

	const product = await Product.findById(req.params.id);
	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		//product.numReviews = numReviews;
		product.countInStock = countInStock;

		const updatedProduct = await product.save();
		res.status(201).json(updatedProduct);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

export {
	getProductById,
	getProducts,
	deleteProduct,
	createProduct,
	updateProduct,
};
