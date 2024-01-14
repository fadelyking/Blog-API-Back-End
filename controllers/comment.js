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
	jwt.verify(req.token, process.env.TOKEN_SECRET, (err, auth) => {
		if (err) {
			res.json({ message: "Please login to post" });
		} else {
			const comment = new Comments({
				user: auth._id,
				post: req.params.id,
				comment: req.body.comment,
			});
			const thepost = Posts.findById(req.params.id);
			console.log(thepost);
			comment.save();
			res.json({ message: "Posted" });
		}
	});

	const post = new Posts({
		title: req.body.title,
		comment: req.body.comment,
		likes: req.body.likes,
		comments: req.body.comment,
		_id: req.params.id,
	});

	await Posts.findByIdAndUpdate(req.params.id, post);
});

exports.delete_comment_post = asyncHandler(async (req, res, next) => {
	jwt.verify(req.token, process.env.TOKEN_SECRET, (err, auth) => {
		if (err) {
			res.json({ message: "Please login to delete" });
		} else {
			const comment = Comments.findByIdAndDelete(req.params.id).exec();

			comment.save();
			res.json({ message: "Posted" });
		}
	});
});
