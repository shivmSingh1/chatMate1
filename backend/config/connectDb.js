const mongoose = require("mongoose");

exports.connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to database successfully")
    } catch (error) {
        console.log(error.message)
        console.log("database connection error")
        process.exist(1)
    }
}

//git checking