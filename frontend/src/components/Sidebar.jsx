import React, { useEffect, useState } from 'react';
import useOtherUsers from '../customHook/useOtherUsers';
import useCurrentUserDetails from '../customHook/useCurrentUserDetails';
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import ActiveUsersCard from './ActiveUsersCard';
import { CiLogout } from "react-icons/ci";
import { GET } from '../../axios/axios.request';
import { useNavigate } from "react-router-dom";
import UserCard from './UserCard';
import { persistor } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData, setSearchUser, setSelectedUser } from '../redux/slices/userSlice';
import { FaUserEdit } from "react-icons/fa";
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import Avatar from "react-avatar";

function Sidebar() {
	const [isSearch, setIsSearch] = useState(false);
	const { userData } = useCurrentUserDetails();
	const otherUsers = useOtherUsers();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { onlineUsers, searchUser, data } = useSelector((state) => state.User);
	const [search, setSearch] = useState("");

	useEffect(() => {
		console.log("search", search)
	}, [search])

	const handleLogout = async () => {
		try {
			const res = await GET("/api/auth/logout");
			if (res.status === 200) {
				dispatch(clearUserData());
				persistor.purge();
				navigate("/login");
			}
		} catch (error) {
			console.log("logout error", error.message);
		}
	};

	const handleSearch = async () => {
		try {
			const res = await GET(`/api/message/searchUsers?query=${search}`);
			if (res.status === 200) {
				dispatch(setSearchUser(res?.data?.data));
			}
		} catch (error) {
			console.log("search error", error.message);
		}
	};

	useEffect(() => {
		handleSearch();
	}, [search]);

	const handleSearchUserClick = (user) => {
		dispatch(setSelectedUser(user));
		setSearch('');
		dispatch(setSearchUser([]));
		setIsSearch(false);
	};

	return (
		<div className="d-flex flex-column justify-content-between h-100 p-3">
			<div>
				{/* Logo */}
				<h4 className="fw-bold text-center text-primary mb-4">ChatMate</h4>

				{/* User info */}
				<div className="d-flex justify-content-between align-items-center border rounded-3 p-2 bg-white shadow-sm mb-3">
					<div>
						<h6 className="mb-0 fw-semibold text-dark">Hi, {userData?.name}</h6>
					</div>
					<div className="position-relative">
						{
							userData?.image ? (
								<img
									src={userData?.image}
									alt="profilePicture"
									width="40"
									height="40"
									className="rounded-circle border"
								/>
							) : (
								<Avatar name={userData?.name} size="40" round={true} />
							)
						}
						<FaUserEdit
							onClick={() => navigate("/profile")}
							className="position-absolute text-primary"
							style={{ bottom: "0", right: "-8px", cursor: "pointer" }}
						/>
					</div>
				</div>

				{/* Search bar */}
				<InputGroup className="mb-3">
					<Form.Control
						placeholder="Search user..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Button variant="outline-secondary" onClick={() => { dispatch(setSearchUser("")); setSearch(""); }}>
						{search ? <RxCross2 /> : <IoIosSearch />}
					</Button>
				</InputGroup>

				{/* Active users */}
				<div className="d-flex flex-wrap justify-content-start mb-3">
					{!isSearch && otherUsers
						?.filter((user) => onlineUsers?.includes(user._id))
						?.map((user) => (
							<span key={user._id} onClick={() => handleSearchUserClick(user)}>
								<ActiveUsersCard greenDot={true} name={user?.name} image={user?.image} />
							</span>
						))}
				</div>

				{/* Search results */}
				{searchUser?.length > 0 && (
					<div className="mb-3">
						{search.length > 0 && searchUser?.map((user) => (
							<span key={user._id} onClick={() => handleSearchUserClick(user)}>
								<ActiveUsersCard greenDot={false} image={user?.image} />
							</span>
						))}
					</div>
				)}

				{/* User list */}
				<div style={{ maxHeight: "60vh", overflowY: "auto" }}>
					{otherUsers?.map((user) => {
						if (user._id === data._id) {
							let selfChatUser = { ...user, name: `${user.name} (You)`, avatarName: `${user.name}` };
							return <UserCard key={user._id} user={selfChatUser} />;
						}
						return <UserCard key={user._id} user={user} />;
					})}
				</div>
			</div>

			{/* Logout */}
			<div className="mt-3 mb-3">
				<Button variant='outline-danger' onClick={handleLogout}>
					<CiLogout size={20} className="me-2" /><small>Logout</small>
				</Button>
			</div>
		</div>
	);
}

export default Sidebar;
