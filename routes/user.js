const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user");

router.get("/sign-up", user_controller.create_users_get);
router.post("/sign-up", user_controller.create_users_post);
router.get("/sign-in", user_controller.login_get);
router.post("/sign-in", user_controller.login_post);

module.exports = router;
