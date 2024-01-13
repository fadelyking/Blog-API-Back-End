require("dotenv").config();
const Posts = require("../models/post");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
	const posts = await Posts.find().populate("user").populate("comments").exec();
	if (posts.length === 0) {
		res.json("No posts, best the first to post !");
	} else {
		res.json({ posts: posts });
	}
});
