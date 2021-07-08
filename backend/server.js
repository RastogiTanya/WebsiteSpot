import express from "express";
import connectDB from "./config/DB.js";
import colors from "colors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
	res.send("Api is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(
	port,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow
			.bold
	)
);
