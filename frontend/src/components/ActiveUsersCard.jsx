import React from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";

function ActiveUsersCard({ image, greenDot }) {
	const { searchUser } = useSelector((state) => state.User)
	return (
		<div className="mx-2 position-relative d-inline-block">
			<Image
				src={image || "https://via.placeholder.com/40"}
				alt="profilePicture"
				roundedCircle
				height={45}
				width={45}
				className="border border-2 border-light shadow-sm"
			/>
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
