import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/message";
import Loader from "../components/loader";
import CheckoutSteps from "../components/CheckoutSteps";
import { getOrderDetails } from "../actions/orderActions";
const OrderScreen = ({ match }) => {
	const orderId = match.params.id;
    
	const dispatch = useDispatch();

	const orderDetails = useSelector((state) => state.orderDetails); //store se data laaya
	const { order, loading, error } = orderDetails;

	useEffect(() => {
		console.log("object");
		dispatch(getOrderDetails(orderId));
	}, []); //whenever history or success changes

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<>
			<h1>Order {order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address</strong>
								{order.shippingAddress.address},
								{order.shippingAddress.city},
								{order.shippingAddress.postalCode},
								{order.shippingAddress.country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<strong>Method: </strong>
							{order.paymentMethod}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Your Items</h2>
							{order.orderItems.length === 0 ? (
								<Message>Your cart is empty !</Message>
							) : (
								<ListGroup
									variant="flush"
									className="my-3 py-3"
								>
									{order.orderItems.map((item, index) => (
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
									<Col>Rs {order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>Rs {order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>Rs {order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>Rs {order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
