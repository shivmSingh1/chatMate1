const { connectDb } = require("./config/connectDb");
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes");
const express = require("express")
const cors = require("cors");
const { app, server } = require("./socket/socket");
const FRONTEND_URL = require("./utils/baseUrl");

require("dotenv").config()
const PORT = process.env.PORT || 7000

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api", indexRouter)

app.get("/", (req, res) => {
    res.send("hello")
})

server.listen(PORT, () => {
    console.log(`server is listining on port ${PORT}`);
    connectDb()
})
