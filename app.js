const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const uploadRouter = require("./routes/index.js");
const usersRouter = require("./routes/users.js");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	fileUpload({
		createParentPath: true,
		limits: {
			fileSize: 70 * 1024 * 1024 * 1024,
		},
		abortOnLimit: true,
	})
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/upload", uploadRouter);
app.use("/users", usersRouter);

app.get("/api", (req, res) => {
	res.sendfile("./views/index.html");
});
app.use("/api/download", express.static(path.join(__dirname, "uploadFiles")));
// development
app.use(
	cors({
		origin: "*",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		preflightContinue: false,
		optionsSuccessStatus: 204,
	})
);

app.use(function (req, res, next) {
	res.status(404).json({
		error_code: 10001,
		data: {},
	});
});

// error handler
app.use(function (err, req, res, next) {
	console.log("Error Code :", err);
	const error_code = Number.isInteger(err) ? err : 10003;
	res.status(500).json({ error_code, data: {} });
});

module.exports = app;
