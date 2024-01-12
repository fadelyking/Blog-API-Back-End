const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: "User" },
	content: String,
	comments: { type: Schema.Types.ObjectId, ref: "Comment" },
});

module.exports = mongoose.model("Posts", PostSchema);
