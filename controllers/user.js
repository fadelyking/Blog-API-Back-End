const Posts = require("../models/post");
const Messages = require("../models/message");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.create_users_get = (req, res, next) => {
	res.json({});
};

exports.create_users_post = [
	body("first_name", "Must be more than 1 letter").trim().isLength({ min: 1 }).escape(),
	body("last_name", "Must be more than 1 letter").trim().isLength({ min: 1 }).escape(),
	body("username", "Please use correct email form").trim().isEmail().escape(),
	body("password", "Password must be more than 6 characters")
		.trim()
		.isLength({ min: 6 })
		.escape(),
	body("confirmpassword", "Passwords are not matching")
		.trim()
		.custom((value, { req }) => {
			return value === req.body.password;
		}),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.sendStatus(403).json({ error: errors.msg });
		}
		bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
			const user = new User({
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				password: hashedPassword,
				admin: false,
			});

			user.save();
			res.sendStatus(200);
		});
	}),
];
