const uploadToCloudinary = require("../config/cloudinary");
const conversation = require("../models/conversation");
const messages = require("../models/messages");
const user = require("../models/user");
const { getReciverSocketId, io } = require("../socket/socket");
const { successResponse, errorResponse } = require("../utils/response");

exports.sendMessage = async (req, res) => {
	try {
		const { userId: senderId } = req
		const { reciverId } = req.params;
		if (!reciverId) {
			return errorResponse(res, "id param is missing")
		}
		const { message } = req.body;
		let image;
		if (req.file) {
			image = await uploadToCloudinary(req.file.path)
		}

		let existingConversation;
		if (senderId === reciverId) {
			existingConversation = await conversation.findOne({
				participants: [senderId, senderId] // exact match
			});
		} else {
			existingConversation = await conversation.findOne({
				participants: { $all: [senderId, reciverId] },
				$expr: { $eq: [{ $size: "$participants" }, 2] } // exactly 2 participants
			});
		}

		const newMessage = await messages.create({
			sender: senderId, reciver: reciverId, image, message
		})

		if (existingConversation) {
			existingConversation.messages.push(newMessage._id)
			await existingConversation.save()
		} else {
			const newConverstation = await conversation.create({
				participants: [
					senderId, reciverId
				],
				messages: [newMessage._id]
			})
		}

		const reciverSocketId = getReciverSocketId(reciverId)
		console.log("riddddddddddd", reciverSocketId)
		if (reciverSocketId) {
			io.to(reciverSocketId).emit("newMsg", newMessage)
		}

		return successResponse(res, "success", newMessage)
	} catch (error) {
		console.log('send message error', error.message)
	}
}

exports.getConversation = async (req, res) => {
	try {
		const { userId: senderId } = req
		const { reciverId } = req.params
		if (!reciverId) {
			return errorResponse(res, "id param is missing")
		}

		// const Conversation = await conversation.findOne({
		// 	participants: { $all: [senderId, reciverId] }
		// }).populate("messages")

		let Conversation;
		if (senderId === reciverId) {
			Conversation = await conversation.findOne({
				participants: [senderId, senderId] // exact match
			}).populate("messages");
		} else {
			Conversation = await conversation.findOne({
				participants: { $all: [senderId, reciverId] },
				$expr: { $eq: [{ $size: "$participants" }, 2] } // exactly 2 participants
			}).populate("messages");
		}

		if (!Conversation) {
			return successResponse(res, "no conversation found")
		}

		return successResponse(res, "conversation fetched", Conversation)
	} catch (error) {
		console.log("error in getConversation", error.message)
	}
}

exports.searchUsers = async (req, res) => {
	try {
		const { query } = req.query
		if (!query) {
			return errorResponse(res, "query not found")
		}
		const users = await user.find({
			$or: [
				{ name: { $regex: query, $options: "i" } },
				{ username: { $regex: query, $options: "i" } },
			],
		}).select("-password"); // optional: hide password field

		if (!users || users.length === 0) {
			return res.status(404).json({ success: false, message: "No users found" });
		}
		return successResponse(res, "user found", users)
	} catch (error) {
		console.log("error in search", error.message)
	}
}