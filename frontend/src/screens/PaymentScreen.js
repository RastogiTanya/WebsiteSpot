import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartAction";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);

	const { shippingAddress } = cart;

	if (!shippingAddress) {
		history.push("/shipping");
	}

	const [paymentMethod, setpaymentMethod] = useState("Paypal");

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push("/placeorder");
	};
	return (
		<FormContainer>
			<CheckoutSteps step1 step2></CheckoutSteps>
			<h1>Payment Method</h1>

			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as="legend">Select Method</Form.Label>

					<Col>
						<Form.Check
							type="radio"
							label="Paypal or Credit card"
							id="paypal"
							name="paymentMethod"
							value="Paypal"
							checked
							onChange={(e) => setpaymentMethod(e.target.value)}
						></Form.Check>
						<Form.Check
							type="radio"
							label="Stripe"
							id="stripe"
							name="paymentMethod"
							value="stripe"
							onChange={(e) => setpaymentMethod(e.target.value)}
						></Form.Check>
					</Col>
				</Form.Group>
				<Button type="submit" variant="dark" className="my-3">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
