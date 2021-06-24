import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Card,
	Button,
	Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/loader";
import Message from "../components/message";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";

const ProductScreen = ({ history, match }) => {
	const [qty, setQty] = useState(0);
	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);

	const { loading, error, product } = productDetails;
	useEffect(() => {
		dispatch(listProductDetails(match.params.id));
	}, [dispatch, match]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	return (
		<>
			<Link className="btn btn-outline-dark my-3" to="/">
				Go back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={4}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>{product.name}</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews}`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>
								Price: Rs {product.price}
							</ListGroup.Item>
							<ListGroup.Item>
								Description: {product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={2}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>{product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0
												? "In Stock"
												: "Out Of Stock"}
										</Col>
										<hr></hr>
									</Row>
								</ListGroup.Item>

								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Quantity:</Col>
											<Form.Control
												as="select"
												value={qty}
												onChange={(e) =>
													setQty(e.target.value)
												}
											>
												{[
													...Array(
														product.countInStock
													).keys(),
												].map((x) => (
													<option
														key={x + 1}
														value={x + 1}
													>
														{x + 1}
													</option>
												))}
											</Form.Control>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button
										onClick={addToCartHandler}
										className={
											"btn btn-block " +
											(product.countInStock > 0
												? "btn-outline-dark "
												: "btn-dark disabled")
										}
										type="button"
									>
										Add to Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export default ProductScreen;
