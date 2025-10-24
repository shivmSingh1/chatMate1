import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import useCurrentUserDetails from '../customHook/useCurrentUserDetails'
import { PUT } from '../../axios/axios.request'
import { useNavigate } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'

function Profile() {
	const { userData } = useCurrentUserDetails()
	const { data } = useSelector((state) => state.User)
	const [profilePic, setProfilePic] = useState(null)
	const [frontendProfilePic, setFrontendProfilePic] = useState(null)
	const [name, setName] = useState("")
	const navigate = useNavigate()

	const handleProfileImage = (e) => {
		const file = e.target.files[0];
		setProfilePic(file);
		setFrontendProfilePic(URL.createObjectURL(file));
	};

	const handleInputChange = (e) => {
		setName(e.target.value)
	}

	const updateProfile = async (payload) => {
		try {
			const res = await PUT("/api/user/editProfile", payload)
			if (res.status === 200) {
				console.log("profile updated")
				navigate("/")
			}
		} catch (error) {
			console.log("profile update error", error.message)
		}
	}

	const handleProfileSubmit = async (e) => {
		e.preventDefault()
		try {
			const formData = new FormData();
			formData.append("image", profilePic ? profilePic : data?.image); // file
			formData.append("name", name ? name : data?.name);
			await updateProfile(formData)
		} catch (error) {
			console.log("profile submit error", error.message)
		}
	}

	return (
		<div className="container py-4" style={{ maxWidth: "500px" }}>
			{/* Back button */}
			<div className="mb-3" onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
				<IoArrowBack size={24} />
			</div>

			<div className="card p-4 shadow-sm rounded">
				<h4 className="text-center mb-4">Edit Profile</h4>
				<form onSubmit={handleProfileSubmit} className="d-flex flex-column gap-3">
					{/* Profile Image */}
					<div className="text-center">
						<label htmlFor="profilePicture" style={{ cursor: "pointer" }}>
							<img
								src={frontendProfilePic ? frontendProfilePic : data?.image}
								alt="Profile"
								className="rounded-circle border"
								width={100}
								height={100}
							/>
							<div className="mt-2 text-primary">Change Photo</div>
						</label>
						<input
							type="file"
							name="profilePicture"
							id="profilePicture"
							onChange={handleProfileImage}
							style={{ display: "none" }}
						/>
					</div>

					{/* User Info */}
					<div>
						<label htmlFor="userName" className="form-label" >Username</label>
						<input
							type="text"
							id="userName"
							name="userName"
							value={data?.userName}
							readOnly
							className="form-control"
							disabled
						/>
					</div>

					<div>
						<label htmlFor="name" className="form-label">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							value={name ? name : data?.name}
							onChange={handleInputChange}
							className="form-control"
						/>
					</div>

					<div>
						<label htmlFor="email" className="form-label">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							value={data?.email}
							readOnly
							className="form-control"
							disabled
						/>
					</div>

					<button type="submit" className="btn btn-primary w-100 mt-2">
						Save Changes
					</button>
				</form>
			</div>
		</div>
	);

}

export default Profile