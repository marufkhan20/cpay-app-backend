const {
  getUserByUsername,
  getUserController,
} = require("../controllers/userController");
const router = require("express").Router();
const checkAuth = require("../middlewares/authMiddleware");

// get user
router.get("/single-user", checkAuth, getUserController);

// get user by username
router.get("/:username", checkAuth, getUserByUsername);

module.exports = router;
