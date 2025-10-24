exports.successResponse = (res, msg, data) => {
    return res.status(200).json({
        success: true,
        msg,
        data
    })
}

exports.errorResponse = (res, msg, data = null) => {
    return res.status(400).json({
        success: false,
        msg,
        data
    })
}


exports.serverResponse = (res, error) => {
    return res.status(500).json({
        success: false,
        msg: "something went wrong",
        error: error?.message
    })
}