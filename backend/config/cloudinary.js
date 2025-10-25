
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require("dotenv").config()

const uploadToCloudinary = async (filePath) => {
	cloudinary.config({
		cloud_name: process.env.CLOUD_NAME,
		api_key: process.env.CLOUD_API_KEY,
		api_secret: process.env.CLOUD_API_SECRET
	});
	// Use the uploaded file's name as the asset's public ID and 
	// allow overwriting the asset with new versions
	const options = {
		use_filename: true,
		unique_filename: false,
		overwrite: true,
	};

	try {
		// Upload the image
		const result = await cloudinary.uploader.upload(filePath, options);
		console.log("uploded", result);
		fs.unlink(filePath, (err) => {
			if (err) console.error("Error deleting local file:", err);
			else console.log("Local file deleted successfully");
		});
		return result.secure_url;
	} catch (error) {
		console.error("Cloudinary upload error:", error);

		// Delete local file even if upload fails
		fs.unlink(filePath, (err) => {
			if (err) console.error("Error deleting local file:", err);
			else console.log("Local file deleted successfully after error");
		});
	}
}

module.exports = uploadToCloudinary;

