require("dotenv").config();
const Comments = require("../models/comment");
const Posts = require("../models/post");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

exports.list_comments_get = asyncHandler(async (req, res, next) => {
	const comments = await Comments.find().populate("user").exec();

	res.json({ comments });
});

exports.create_comment_post = asyncHandler(async (req, res, next) => {
	const post = await Posts.findById(req.params.id);
	jwt.verify(req.token, process.env.TOKEN_SECRET, (err, auth) => {
		if (err) {
			res.json({ message: "Please login to post" });
		} else {
			const comment = new Comments({
				user: auth._id,
				post: req.params.id,
				comment: req.body.comment,
			});
			comment.save();
			post.comments.push(comment);
			post.save();
			res.json({ message: "Posted" });
		}
	});
});

exports.delete_comment_post = asyncHandler(async (req, res, next) => {
	jwt.verify(req.token, process.env.TOKEN_SECRET, (err, auth) => {
		if (err) {
			res.json({ message: "Please login to delete" });
		} else {
			Comments.findOneAndDelete({ comments: req.body.comment }).exec();

			res.json({ message: "Deleted" });
		}
	});
});