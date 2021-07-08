import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/message";

import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
const PlaceOrderScreen = ({ history }) => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	const orderCreate = useSelector((state) => state.orderCreate); //store se data laaya
	const { order, success, error } = orderCreate;

	useEffect(() => {
		if (success) {
			// eslint-disable-next-line
			history.push(`/order/${order._id}`);
		}
	}, [history, success]);//whenever history or success changes

	const placeOrderHandler = () => {
		dispatch(
			createOrder({ //action creator
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		);
	};
	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);
	cart.shippingPrice = addDecimals(cart.itemsPrice > 6000 ? 0 : 100);
	cart.taxPrice = addDecimals(Number((0.05 * cart.itemsPrice).toFixed(2)));

	cart.totalPrice = (
		Number(cart.itemsPrice) +
		Number(cart.shippingPrice) +
		Number(cart.taxPrice)
	).toFixed(2);
	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address</strong>
								{cart.shippingAddress.address},
								{cart.shippingAddress.city},
								{cart.shippingAddress.postalCode},
								{cart.shippingAddress.country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<strong>Method: </strong>
							{cart.paymentMethod}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Your Items</h2>
							{cart.cartItems.length === 0 ? (
								<Message>Your cart is empty !</Message>
							) : (
								<ListGroup
									variant="flush"
									className="my-3 py-3"
								>
									{cart.cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link
														to={`/product/${item.product}`}
													>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} * Rs {item.price}{" "}
													= Rs {item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>Rs {cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>Rs {cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>Rs {cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>Rs {cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{error && (
									<Message variant="danger">{error}</Message>
								)}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									variant="dark"
									className="btn btn-outline-dark"
									type="button"
									disabled={cart.cartItems === 0}
									onClick={placeOrderHandler}
								>
									Place order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
