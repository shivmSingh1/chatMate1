const jwt = require("jsonwebtoken")
require('dotenv').config()
const key = process.env.JWT_SECRET_KEY
exports.genToken =(id,secretKey=key)=>{
    try {
        console.log("token id",id)
        const token = jwt.sign({id},secretKey,{expiresIn:"7d"})
        return token
    } catch (error) {
        console.log("something went wrong while genrating jwt token",error.message)
    }
}