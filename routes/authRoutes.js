const {
  createNewUserController,
  loginUserController,
  checkEmailExistingController,
} = require("../controllers/authController");

const router = require("express").Router();

// create new user
router.post("/register", createNewUserController);

// check email already existend
router.post("/check-email", checkEmailExistingController);

// login existing user
router.post("/login", loginUserController);

module.exports = router;
