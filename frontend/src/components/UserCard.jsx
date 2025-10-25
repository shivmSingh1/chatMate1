import React from "react";
import { Card, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/slices/userSlice";
import Avatar from "react-avatar";

function UserCard({ user }) {
	const dispatch = useDispatch();

	const handleSelectedUser = () => {
		dispatch(setSelectedUser(user));
	};

	return (
		<Card
			onClick={handleSelectedUser}
			className="d-flex flex-row align-items-center p-2 my-2 mx-2 shadow-sm border-0 bg-white hover-shadow-sm"
			style={{
				cursor: "pointer",
				transition: "0.2s ease",
				borderRadius: "12px",
			}}
		>
			{
				user?.image ? (
					<Image
						src={user?.image}
						alt="profilePicture"
						roundedCircle
						height={45}
						width={45}
						className="me-3 border"
					/>
				) : <Avatar name={user?.avatarName} className="me-3" size="40" round={true} />
			}
			<div>
				<h6 className="m-0 fw-semibold text-dark">{user?.name}</h6>
				{/* <small className="text-muted">Click to chat</small> */}
			</div>
		</Card>
	);
}

export default UserCard;
