import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/message";
import Loader from "../components/loader";
import { listUsers, deleteUser } from "../actions/userAction";

const UserListScreen = ({ history }) => {
	const dispatch = useDispatch();
	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		} else {
			history.push("/login");
		}
	}, [dispatch, history, successDelete]);

	const deleteHandler = (id) => {
		//console.log(id);
		if (window.confirm("Are you sure")) {
			dispatch(deleteUser(id));
		}
	};
	return (
		<>
			<h1>USERS</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message varinat="danger">{error}</Message>
			) : (
				<Table striped hover responsive bordered className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>
									<a href={`mailto:${user.email}`}>
										{user.email}
									</a>{" "}
								</td>
								<td>
									{user.isAdmin ? (
										<i
											className="fas fa-check"
											style={{ color: "green" }}
										></i>
									) : (
										<i
											className="fas fa-times"
											style={{ color: "red" }}
										></i>
									)}
								</td>
								<td>
									<LinkContainer
										to={`/user/${user._id}/edit`}
									>
										<Button
											variant="white"
											className="btn-sm"
										>
											<i className="fas fa-edit"></i>
										</Button>
									</LinkContainer>
									<Button
										variant="danger"
										className="btn-sm"
										onClick={() => deleteHandler(user._id)}
									>
										<i className="fas fa-trash"></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default UserListScreen;
