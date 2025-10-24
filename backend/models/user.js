const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String, 
        default:""
    }
})

module.exports = mongoose.model("User",userSchema)