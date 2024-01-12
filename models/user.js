const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	admin: Boolean,
	posts: { type: Schema.Types.ObjectId, ref: "Post" },
	comments: { type: Schema.Types.ObjectId, ref: "Comments" },
});

UserSchema.virtual("full_name").get(function () {
	return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.Schema("User", UserSchema);
