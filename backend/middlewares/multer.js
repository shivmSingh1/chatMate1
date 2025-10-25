const multer = require("multer");

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, "./Public")
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, Date.now() + "-" + file.originalname)
// 	}
// })
// const upload = multer({ storage });
// module.exports = upload


const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const uploadPath = path.join(__dirname, "..", "Public");
		if (!fs.existsSync(uploadPath)) {
			fs.mkdirSync(uploadPath, { recursive: true });
		}
		cb(null, uploadPath);
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const upload = multer({ storage });
module.exports = upload


