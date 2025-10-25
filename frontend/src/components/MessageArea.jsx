import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { MdAttachment } from "react-icons/md";
import EmojiPicker from 'emoji-picker-react';
import { GET, POST } from '../../axios/axios.request';
import { setConverstation } from '../redux/slices/messageSlice';
import DotLoader from '../common/DotLoader';
import { RxCross1 } from 'react-icons/rx';
import { setSelectedUser } from '../redux/slices/userSlice';
import { Spinner } from 'react-bootstrap';



function MessageArea() {
	const { selectedUser, socket, onlineUsers, data } = useSelector((state) => state.User)
	const [showEmoji, setShowEmoji] = useState(false)
	const [messageText, setMessageText] = useState("")
	const [frontendImage, setFrontendImage] = useState(null)
	const [loading, setLoading] = useState(false)
	const [image, setImage] = useState("")
	const imageRef = useRef()
	const dispatch = useDispatch()
	const scrollRef = useRef()

	let { messages } = useSelector((state) => state.Msg)

	useEffect(() => {
		console.log('selected users', selectedUser)
	}, [selectedUser])

	useEffect(() => {
		if (!socket || typeof socket.on !== "function") {
			console.log("socket not valid:", socket);
			return;
		}
		console.log("socket found")
		const handleNewMsg = (msg) => {
			console.log("📩 New message from socket:", msg);

			// agar messages already loaded hain
			if (messages?.messages) {
				const updatedConversation = {
					...messages,
					messages: [...messages?.messages, msg]
				};
				dispatch(setConverstation(updatedConversation));
			} else {
				// agar pehli baar aa raha hai
				dispatch(setConverstation({ messages: [msg] }));
			}
		};

		if (socket) {
			socket?.on("newMsg", handleNewMsg);
		}

		// cleanup
		return () => {
			socket.off("newMsg", handleNewMsg);
		};
	}, [socket, selectedUser, messages]);

	useEffect(() => {
		if (socket) {
			socket.on("newMsg", (msg) => {
				console.log(msg)
			})
		}
	}, [socket, selectedUser])

	const handleEmojiBtnClick = () => {
		setShowEmoji((prev) => !prev)
	}

	const handleEmojiClick = (e) => {
		setMessageText((prev) => prev + e.emoji)
		setShowEmoji(false)
	}

	const handleChange = (e) => {
		setMessageText(e.target.value)
	}

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file)
			setFrontendImage(URL.createObjectURL(file))
		}
	};

	const handleAttachmentClick = () => {
		imageRef.current.click();
	};

	const handleSendBtn = async () => {
		console.log(messageText)
		if (!messageText && !image) {
			return
		}
		try {
			const formData = new FormData()
			formData.append("message", messageText);
			if (image) {
				formData.append("image", image);
			}
			setLoading(true)
			const res = await POST(`/api/message/sendMessage/${selectedUser?._id}`, formData)
			if (res.status === 200) {
				console.log("message sent")
				const sentMsg = res.data?.data;

				let updatedConversation;
				if (!messages?.participants) {
					updatedConversation = {
						participants: [data?._id, selectedUser?._id],
						messages: [sentMsg],
					};
				} else {
					updatedConversation = {
						...messages,
						messages: [...(messages?.messages || []), sentMsg],
					};
				}

				dispatch(setConverstation(updatedConversation));
				setLoading(false)
			}
			setFrontendImage(null)
			setMessageText("")
		} catch (error) {
			console.log("messaget send error", error.message)
			setLoading(false)
		}
	}

	const getConversation = async () => {
		try {
			const res = await GET(`/api/message/getConversation/${selectedUser._id}`)
			if (res.status === 200) {
				console.log("conversation", res?.data?.data)
				dispatch(setConverstation(res?.data?.data))
			}
		} catch (error) {
			console.log("get conversation error", error.message)
		}
	}

	useEffect(() => {
		if (selectedUser?._id) {
			getConversation(dispatch, selectedUser)
		}
	}, [selectedUser])

	useEffect(() => {
		scrollRef?.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	// if (!selectedUser) {
	// 	return (
	// 		<div className='d-flex justify-content-center align-items-center' >
	// 			<h1>Welcome to ChatMate !</h1>
	// 		</div>
	// 	)
	// }
	return (
		<div className="h-100">
			{Object.keys(selectedUser || {}).length > 0 ? (
				<div
					className="d-flex flex-column  justify-content-between  bg-light rounded shadow-sm"
					style={{ maxHeight: "100vh", minHeight: "100vh" }}
				>
					{/* ===== Header ===== */}
					<div className="d-flex align-items-center position-relative justify-content-between gap-3 border-bottom bg-white p-3">
						<div className='d-flex gap-3' >
							<img
								src={selectedUser?.image || "https://via.placeholder.com/50"}
								alt=""
								width="50"
								height="50"
								className="rounded-circle border"
							/>
							<div>
								<h5 className="m-0 fw-semibold">{selectedUser?.name}</h5>
								<small
									className={
										onlineUsers.includes(selectedUser._id)
											? "text-success fw-semibold"
											: "text-muted"
									}
								>
									{onlineUsers.includes(selectedUser._id) ? "● Online" : "○ Offline"}
								</small>
							</div>
						</div>
						<span className='me-4' onClick={() => dispatch(setSelectedUser({}))} ><RxCross1 /></span>
					</div>

					{/* ===== Messages Area ===== */}
					<div
						className="flex-grow-1 overflow-auto scroll-container p-3 bg-white"
						style={{ minHeight: "100%" }}
					>
						{messages?.participants &&
							((messages.participants.includes(selectedUser?._id) &&
								messages.participants.includes(data?._id)) ||
								(selectedUser?._id === data?._id &&
									messages.participants.length === 2 &&
									messages.participants[0] === data?._id &&
									messages.participants[1] === data?._id)) &&
							messages?.messages?.map((msg) => (
								<div
									key={msg._id}
									className={`d-flex flex-column mb-2 ${msg.sender === selectedUser?._id
										? "align-items-start"
										: "align-items-end"
										}`}
								>
									<div
										className={`p-2 rounded-3 shadow-sm ${msg.sender === selectedUser?._id
											? "bg-light text-dark"
											: "bg-primary text-white"
											}`}
										style={{
											maxWidth: "60%",
											wordBreak: "break-word",
										}}
									>
										{msg.message && <p className="mb-1">{msg.message}</p>}
										{msg.image && (
											<img
												src={msg.image}
												alt="msg"
												style={{
													maxWidth: "200px",
													borderRadius: "8px",
													marginTop: msg.message ? "8px" : "0",
												}}
											/>
										)}
									</div>
								</div>
							))}

						{/* Preview image before sending */}
						{frontendImage && (
							<div
								className="position-absolute shadow-sm border rounded bg-white p-2"
								style={{ bottom: "80px", right: "70px" }}
							>
								<div className=' ' >
									<img
										src={frontendImage}
										alt="preview"
										width="100"
										height="100"
										className="rounded"
									/>
									{
										loading && (
											<span
												style={{
													position: "absolute",
													top: "50%",
													left: "50%",
													transform: "translate(-50%, -50%)",
													zIndex: 3
												}}
											>
												<Spinner animation="border" style={{ color: "white" }} />
											</span>
										)
									}
								</div>
							</div>
						)}

						{/* Emoji Picker */}
						{showEmoji && (
							<div
								className="position-absolute"
								style={{ bottom: "80px", right: "35%", zIndex: 10 }}
							>
								<EmojiPicker height={"250px"} onEmojiClick={handleEmojiClick}
									searchDisabled={true}
									skinTonePickerHidden={true} // skin tone selector hide
									previewConfig={{ showPreview: false }}
								/>
							</div>
						)}
						<div ref={scrollRef}></div>
					</div>

					{/* ===== Input Area ===== */}
					<div className="d-flex align-items-center gap-3 border-top bg-white p-3">
						<MdOutlineEmojiEmotions
							size={26}
							style={{ cursor: "pointer", color: "#0d6efd" }}
							onClick={handleEmojiBtnClick}
						/>
						<input
							type="text"
							name="message"
							value={messageText}
							id="message"
							className="form-control rounded-pill border-secondary flex-grow-1"
							placeholder="Type a message..."
							onChange={handleChange}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									handleSendBtn();
								}
							}}
						/>
						<input
							type="file"
							name="image"
							id="image"
							ref={imageRef}
							style={{ display: "none" }}
							onChange={handleFileChange}
						/>
						<MdAttachment
							size={24}
							style={{ cursor: "pointer", color: "#6c757d" }}
							onClick={handleAttachmentClick}
						/>
						{!loading ? (
							<IoMdSend
								size={28}
								style={{ cursor: "pointer" }}
								onClick={handleSendBtn}
							/>
						) : (
							<DotLoader />
						)}
					</div>
				</div>
			) : (
				<div className="d-flex justify-content-center align-items-center h-100">
					<h3 className="text-secondary">Welcome to <span className="text-primary fw-bold">ChatMate!</span></h3>
				</div>
			)}
		</div>
	);

}

export default MessageArea