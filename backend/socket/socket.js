const express = require("express");
const http = require("http")
const { Server } = require("socket.io");
const FRONTEND_URL = require("../utils/baseUrl");

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
	cors: FRONTEND_URL
})

let socketUserMap = {};

const getReciverSocketId = (reciverId) => {
	console.log("reciverId", reciverId)
	console.log("socketId", socketUserMap[reciverId])
	console.log("map", socketUserMap)
	return socketUserMap[reciverId]
}

io.on("connection", (socket) => {
	const userId = socket.handshake.query.userId
	console.log(userId)
	socketUserMap[userId] = socket.id

	io.emit("onlineUsers", Object.keys(socketUserMap))

	socket.on("disconnect", () => {
		delete socketUserMap[userId]
		io.emit("onlineUsers", Object.keys(socketUserMap))
	})

})


module.exports = { app, server, io, getReciverSocketId }
