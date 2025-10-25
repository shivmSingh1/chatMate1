
const bcrypt = require("bcrypt")
// const { default: user } = require("../models/user")
const { serverResponse, errorResponse, successResponse } = require("../utils/response")
const user = require("../models/user")
const { genToken } = require("../utils/token")

exports.signup = async (req, res) => {
    try {
        const { userName, email, password, name } = req.body
        if (!userName || !email || !password || !name) {
            return errorResponse(res, "required body parameters")
        }
        const existingUsername = await user.findOne({
            where: {
                userName
            }
        })

        if (existingUsername) {
            return errorResponse(res, "username already exists, try different username")
        }

        const existingEmail = await user.findOne({
            where: {
                email
            }
        })

        if (existingEmail) {
            return errorResponse(res, "email already exists, try different email")
        }

        if (password.length < 6) {
            return errorResponse(res, "password length must be greater than 6 characters")
        }

        const hashPassword = await bcrypt.hash(password, 10);
        console.log("hash password", hashPassword)

        const newUser = await user.create({
            userName,
            email: email,
            name: name,
            password: hashPassword
        })

        if (newUser) {
            const token = genToken(newUser._id)
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: "None",
                secure: true
                // sameSite: "Lax",
                // secure: false
            })
            return successResponse(res, "user created successfully", newUser)
        }
    } catch (error) {
        return serverResponse(res, error)
    }
}

exports.login = async (req, res) => {
    try {
        const { password, userName } = req.body
        if (!password || !userName) {
            return errorResponse(res, "required body parameters")
        }

        const userDetails = await user.findOne({
            userName
        })

        if (!userDetails) {
            return errorResponse(res, "user not found")
        }

        const isMatched = await bcrypt.compare(password.toString(), userDetails.password);
        console.log("compare password", isMatched)

        let token;
        if (isMatched) {
            token = genToken(userDetails._id)
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: "None",
                secure: true
                // sameSite: "Lax",
                // secure: false
            })
            return successResponse(res, "user login successfully", token)
        }
    } catch (error) {
        return serverResponse(res, error)
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "None",
            secure: true, // production me true rakhna
            // sameSite: "Lax",
            // secure: false
        });

        return successResponse(res, "User logged out successfully");

    } catch (error) {
        return serverResponse(res, error)
    }
}
