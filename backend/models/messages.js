const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true
	},
	reciver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true
	},
	message: {
		type: String,
		default: ""
	},
	image: {
		type: String,
		default: ""
	}
}, { timestamps: true })

module.exports = mongoose.model("Message", messageSchema)