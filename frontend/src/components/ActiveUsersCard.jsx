import React from "react";
import Avatar from "react-avatar";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";

function ActiveUsersCard({ image, name, greenDot }) {
	const { searchUser } = useSelector((state) => state.User)
	return (
		<div className="mx-2 position-relative d-inline-block">
			{
				image ? (
					<Image
						src={image}
						alt="profilePicture"
						roundedCircle
						height={45}
						width={45}
						className="border border-2 border-light shadow-sm"
					/>
				) : (
					<Avatar name={name} size="45" round={true} />
				)
			}
			{/* Green dot for active status */}
			{
				greenDot && <div
					style={{
						position: "absolute",
						bottom: "0px",
						right: "0px",
						width: "12px",
						height: "12px",
						backgroundColor: "#28a745",
						border: "2px solid white",
						borderRadius: "50%",
						zIndex: 2,
					}}
				></div>
			}
		</div>
	);
}

export default ActiveUsersCard;
