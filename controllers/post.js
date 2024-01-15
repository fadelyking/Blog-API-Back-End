require("dotenv").config();
const Posts = require("../models/post");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
	const posts = await Posts.find().populate("user").populate("comments").exec();
	jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
		if (err) {
			res.json({ posts: posts });
		} else {
			if (posts.length === 0) {
				res.json({ message: "No posts, be the first to post !", user: authData });
			}
			res.json({ posts: posts, user: authData });
		}
	});
});

exports.post_detail = asyncHandler(async (req, res, next) => {
	const post = await Posts.findById(req.params.id).populate("user").populate("comments").exec();
	res.json({ post });
});

exports.create_post_get = (req, res, next) => {
	jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
		if (err) {
			res.json({ auth: false });
		} else {
			res.json({ message: "Create post route active", user: authData });
		}
	});
};

exports.create_post_post = [
	body("title", "Title must be more than 3 letters long").trim().isLength({ min: 3 }).escape(),
	body("content", "Content must be more than 10 letters long")
		.trim()
		.isLength({ min: 10 })
		.escape(),

	asyncHandler(async (req, res, next) => {
		jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
			if (err) {
				console.log(err);
				res.sendStatus(403);
			} else {
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					res.json(errors.array());
				}

				const post = new Posts({
					user: authData._id,
					title: req.body.title,
					content: req.body.content,
					likes: 0,
				});
				post.save();
				res.json({ message: "Post Created" });
			}
		});
	}),
];

exports.update_post_get = asyncHandler(async (req, res, next) => {
	jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
		if (err) {
			res.json("You are not authorized to view this");
		} else {
			const post = Posts.findById(req.params.id).exec();

			res.json({ post: post, user: authData });
		}
	});
});

exports.update_post_post = [
	body("title", "Title must be more than 3 letters long").trim().isLength({ min: 3 }).escape(),
	body("content", "Content must be more than 10 letters long")
		.trim()
		.isLength({ min: 10 })
		.escape(),

	asyncHandler(async (req, res, next) => {
		jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
			if (err) {
				res.json("You are not authorized to view this");
			} else {
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					res.json({ error: errors.array() });
				}

				const post = new Posts({
					title: req.body.title,
					content: req.body.content,
					likes: req.body.likes,
					_id: req.params.id,
				});

				Posts.findByIdAndUpdate(req.params.id, post);
				res.json({ message: "Post Edited" });
			}
		});
	}),
];

exports.delete_post_get = asyncHandler(async (req, res, next) => {
	jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
		if (err) {
			res.json({ message: "You are not authorized to view this" });
		} else {
			const post = Posts.findById(req.params.id).exec();
			res.json({ post: post, user: authData });
		}
	});
});

exports.delete_posts_post = asyncHandler(async (req, res, next) => {
	jwt.verify(req.token, process.env.TOKEN_SECRET, (err, authData) => {
		if (err) {
			res.json({ message: "You are not authorized to view this" });
		} else {
			res.json({ message: "Post Deleted", user: authData });
			Posts.findByIdAndDelete(req.params.id).exec();
		}
	});
});
