const express = require("express");
const router = express.Router();
const auth = require("../config/verifyToken");
const post_controller = require("../controllers/post");

router.get("/", post_controller.index);
router.get("/post/create", auth, post_controller.create_post_get);
router.post("/post/create", auth, post_controller.create_post_post);
router.get("/post/:id", post_controller.post_detail);
router.get("/post/:id/delete", auth, post_controller.delete_post_get);
router.post("/post/:id/delete", auth, post_controller.delete_posts_post);
router.get("/post/:id/update", auth, post_controller.update_post_get);
router.post("/post/:id/update", auth, post_controller.update_post_post);

module.exports = router;
