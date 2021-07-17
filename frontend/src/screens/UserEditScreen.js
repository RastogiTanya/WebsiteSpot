import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/message";
import Loader from "../components/loader";
import { getUserDetails } from "../actions/userAction";
import FormContainer from "../components/FormContainer";

const UserEditScreen = ({ match, history }) => {
	const userId = match.params.id;
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [isAdmin, setisAdmin] = useState(false);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	useEffect(() => {
		if (!user.name || user._id !== userId) {
			dispatch(getUserDetails(userId));
		} else {
			setName(user.name);
			setEmail(user.email);
			setisAdmin(user.isAdmin);
		}
	}, [dispatch, userId, user]);

	const submitHandler = (e) => {
		e.preventDefault();

		// console.log(userInfo);
	};

	return (
		<>
			<Link to="/admin/userList" className="btn btn-light my-3">
				Go BAck
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{loading ? (
					<Loader />
				) : error ? (
					<Message varinat="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="email">
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="isAdmin" className="my-2">
							<Form.Check
								type="checkbox"
								label="Is admin"
								checked={isAdmin}
								onChange={(e) => setisAdmin(e.target.checked)}
							></Form.Check>
						</Form.Group>

						<Button
							className="my-2"
							type="submit"
							variant="primary"
						>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
