const uploadToCloudinary = require("../config/cloudinary");
const user = require("../models/user");
const { errorResponse, successResponse } = require("../utils/response");

exports.getCurrentUser = async (req, res) => {
	try {
		const { userId } = req;
		console.log("userId", userId)

		const userDetails = await user.findById({ _id: userId }).select("-password")
		if (!userDetails) {
			return errorResponse(res, "user detail not found");
		}

		return successResponse(res, "user details fetch successfully", userDetails)
	} catch (error) {
		console.log("error", error.message)
	}
}

exports.editProfile = async (req, res, next) => {
	try {
		const { name } = req.body;
		const { userId } = req;
		let image;
		if (req.file) {
			image = await uploadToCloudinary(req.file.path)
		}

		const updatedUser = await user.findByIdAndUpdate({ _id: userId }, {
			name, image
		}, { new: true });

		if (!updatedUser) {
			return errorResponse(res, "user detail not found");
		}
		return successResponse(res, "user details fetch successfully", updatedUser)
	} catch (error) {
		console.log("error", error.message)
	}
}

exports.getAllOtherUsers = async (req, res, next) => {
	try {
		const { userId } = req;
		const users = await user.find({}).select("-password")
		console.log("users", users);
		if (!users || users.length === 0) {
			return errorResponse(res, "users not found")
		}
		return successResponse(res, "all users fetched successfully", users)
	} catch (error) {
		console.log("error", error.message)
	}
}