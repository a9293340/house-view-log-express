var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.status(200).json({
		error_code: 0,
		data: {
			x: 1,
			y: 2,
		},
	});
});

module.exports = router;
