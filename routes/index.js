const express = require("express");
const router = express.Router();
const path = require("path");

router.post("/", async (req, res) => {
	try {
		// handle no file
		if (!req.files) {
			res.status(400).json({
				error_code: 2000,
				data: {},
			});
			// handle has files
		} else {
			let avatar = req.files.uploadedFile;
			console.log(path.extname(avatar.name));
			if (
				![".svg", ".png", ".jpg", ".jpeg", ".ico"].includes(
					path.extname(avatar.name)
				)
			)
				return res.status(422).json({
					error_code: 2002,
					data: {},
				});

			avatar.mv(`./uploadFiles/` + avatar.name);

			res.status(200).json({
				error_code: 0,
				data: {
					name: avatar.name,
					mimetype: avatar.mimetype,
					size: avatar.size,
					path: `/api/download/` + avatar.name,
				},
			});
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({
			error_code: 2003,
			data: {},
		});
	}
});

module.exports = router;
