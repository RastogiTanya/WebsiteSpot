import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/message.js";
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
import { addToCart, removeFromCart } from "../actions/cartAction.js";

const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id;

	const qty = location.search ? Number(location.search.split("=")[1]) : 1;
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	//console.log(cartItems);

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};
	//	console.log(qty);
	const checkOutHandler = () => {
		history.push("/login?redirect=shipping");
	};
	return (
		<Row className="py-3 ">
			<Col md={9}>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message>
						Your cart is empty <Link to="/">Go Back</Link>
					</Message>
				) : (
					<ListGroup variant="flush">
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={3} className="my-1 py-1">
										<Image
											src={item.image}
											alt={item.name}
											fluid
											rounded
										></Image>
									</Col>
									<Col md={3} className="my-3 py-1">
										<Link to={`/product/${item.product}`}>
											<h1> {item.name}</h1>
										</Link>
									</Col>
									<Col md={2} className="my-3 py-3">
										<h2>Rs {item.price}</h2>
									</Col>
									<Col md={2} className="my-3 py-3">
										<Form.Control
											as="select"
											value={item.qty}
											onChange={(e) =>
												dispatch(
													addToCart(
														item.product,
														Number(e.target.value)
													)
												)
											}
										>
											{[
												...Array(
													item.countInStock
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
									</Col>
									<Col md={2} className="my-3 py-3">
										<Button
											type="button"
											data-bs-toggle="tooltip"
											data-bs-placement="bottom"
											title="Remove from cart"
											className="btn btn-block btn-outline-dark mx-3"
											onClick={() =>
												removeFromCartHandler(
													item.product
												)
											}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={3} className="py-3 my-4">
				<Card className="card mb-3">
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2 className="card-title">
								Subtotal(
								{cartItems.reduce(
									(acc, item) => acc + item.qty,
									0
								)}
								) items
							</h2>
							Rs{" "}
							{cartItems
								.reduce(
									(acc, item) => acc + item.qty * item.price,
									0
								)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type="button"
								className="btn-block btn-outline-success"
								disabled={cartItems.length === 0}
								onClick={checkOutHandler}
							>
								Proceed to check out
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default CartScreen;
