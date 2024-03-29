var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const postsRouter = require("./routes/post");
const usersRouter = require("./routes/user");
const commentRouter = require("./routes/comment");
const cors = require('cors')
const mongoDB = process.env.MONGODB_URI;
main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect(mongoDB);
}
var app = express();
const jwt = require("jsonwebtoken");
app.use(cors())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", postsRouter);
app.use("/comment", commentRouter);
app.use("/user", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500).json({ error: "error" });
});

module.exports = app;
