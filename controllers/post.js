require("dotenv").config();
const Posts = require("../models/post");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
	const posts = await Posts.find().populate("user").populate("comments").exec();
	if (posts.length === 0) {
		res.json("No posts, be the first to post !");
	} else {
		res.json({ posts: posts });
	}
});

exports.create_post_get = (req, res, next) => {
	res.json("Create post route active");
};

exports.create_post_post = [
	body("title", "Title must be more than 3 letters long").trim().isLength({ min: 3 }).exec(),
	body("content", "Content must be more than 10 letters long")
		.trim()
		.isLength({ min: 10 }.exec()),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.json(errors.array());
		}

		const post = new Posts({
			title: req.body.title,
			content: req.body.content,
			likes: 0,
		});

		post.save();
		res.json({ post });
	}),
];

exports.update_post_get = asyncHandler(async (req, res, next) => {
	const post = await Posts.findById(req.params.id).exec();

	res.json(post);
});

exports.update_post_post = [
	body("title", "Title must be more than 3 letters long").trim().isLength({ min: 3 }).exec(),
	body("content", "Content must be more than 10 letters long")
		.trim()
		.isLength({ min: 10 }.exec()),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.json({ error: errors.array() });
		}

		const post = new Posts({
			title: req.body.title,
			content: req.body.content,
			_id: req.params.id,
		});

		await Posts.findByIdAndUpdate(req.params.id, post);
	}),
];
