const express = require("express");
const router = express.Router();
const auth = require("../config/verifyToken");
const comments_controller = require("../controllers/comment");

router.get("/post/:id", comments_controller.list_comments_get);
router.post("/post/:id", auth, comments_controller.create_comment_post);
router.post("/post/:id", auth, comments_controller.delete_comment_post);

module.exports = router;
