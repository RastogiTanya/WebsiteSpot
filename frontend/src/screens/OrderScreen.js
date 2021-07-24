import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/message";
import Loader from "../components/loader";
import {
	getOrderDetails,
	payOrder,
	deliverOrder,
} from "../actions/orderActions";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import {
	ORDER_PAY_RESET,
	ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
const OrderScreen = ({ match, history }) => {
	const orderId = match.params.id;

	const [sdkReady, setSdkReady] = useState(false);

	const dispatch = useDispatch();

	const orderDetails = useSelector((state) => state.orderDetails); //store se data laaya
	const { order, loading, error } = orderDetails;

	const orderPay = useSelector((state) => state.orderPay); //store se data laaya
	const { loading: loadingPay, success: successPay } = orderPay;

	const orderDeliver = useSelector((state) => state.orderDeliver);
	const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

	const userLogin = useSelector((state) => state.userLogin); //store se data laaya
	const { userInfo } = userLogin;

	if (!loading) {
		const addDecimals = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2);
		};
		order.itemsPrice = addDecimals(
			order.orderItems.reduce(
				(acc, item) => acc + item.price * item.qty,
				0
			)
		);
	}

	useEffect(() => {
		if (!userInfo) {
			history.push("/login");
		}
		const addPaypalScript = async () => {
			const { data: clientId } = await axios.get("/api/config/paypal");
			console.log(clientId);
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};
		if (!order || successPay || successDeliver) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch({ type: ORDER_DELIVER_RESET });
			dispatch(getOrderDetails(orderId));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPaypalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [dispatch, orderId, order, successPay, history, successDeliver]); //whenever history or success changes

	const successPaymentHandler = (paymentResult) => {
		dispatch(payOrder(orderId, paymentResult));
		console.log(paymentResult);
	};

	const deliverHandler = () => {
		dispatch(deliverOrder(order));
	};

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
								<strong>Name: </strong>
								{order.user.name}
							</p>
							<p>
								{" "}
								<strong>Email: </strong>
								<a href={`mailto:${order.user.email}`}>
									{order.user.email}
								</a>
							</p>
							<p>
								<strong>Address: </strong>
								{order.shippingAddress.address},
								{order.shippingAddress.city},
								{order.shippingAddress.postalCode},
								{order.shippingAddress.country}
							</p>
							{order.isDelivered ? (
								<Message variant="success">
									Delivered on {order.deliveredAt}
								</Message>
							) : (
								<Message variant="danger">
									Not Delivered
								</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{order.paymentMethod}
							</p>
							{console.log(order.isPaid)}
							{order.isPaid ? (
								<Message variant="success">
									Paid on {order.paidAt}
								</Message>
							) : (
								<Message variant="danger">Not paid</Message>
							)}
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
									<Col>Rs 20</Col>
								</Row>
							</ListGroup.Item>
							{!order.isPaid && (
								<ListGroup.Item>
									{loadingPay && <Loader />}
									{!sdkReady ? (
										<Loader />
									) : (
										<PayPalButton
											amount={20}
											onSuccess={successPaymentHandler}
										/>
									)}
								</ListGroup.Item>
							)}
							{loadingDeliver && <Loader />}
							{userInfo &&
								userInfo.isAdmin &&
								order.isPaid &&
								!order.isDelivered && (
									<ListGroup.Item>
										<Button
											type="button"
											className="btn btn-block"
											onClick={deliverHandler}
										>
											Mark as delivered
										</Button>
									</ListGroup.Item>
								)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
