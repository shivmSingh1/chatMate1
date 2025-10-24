const { errorResponse } = require("../utils/response");
const jwt = require("jsonwebtoken")

exports.isAuth = async (req, res, next) => {
	try {
		// console.log("cookies", req.cookies)
		const token = req.cookies.token;
		// console.log("token", token)

		if (!token) {
			return errorResponse(res, "token not found")
		}

		const decodeToken = await jwt.verify(token, process.env.JWT_SECRET_KEY)

		// console.log("decode token", decodeToken)

		if (!decodeToken) {
			return errorResponse(res, " decoded token not found")
		}

		req.userId = decodeToken.id
		next()
	} catch (error) {
		console.log("isAuth middleware error", error.message)
	}
}