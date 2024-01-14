const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: "User" },
	title: String,
	content: String,
	likes: Number,
	comments: { type: Schema.Types.ObjectId, ref: "Comment" },
	published: Boolean,
});

module.exports = mongoose.model("Posts", PostSchema);
