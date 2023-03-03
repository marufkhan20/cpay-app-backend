const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create new user controller
const createNewUserController = async (req, res) => {
  try {
    const {
      fullName,
      username,
      email,
      phone,
      password,
      street,
      houseNumber,
      zipCode,
      residence,
    } = req.body;

    // password hash
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }

        // Create New User
        const newUser = new User({
          fullName,
          username,
          email,
          phone,
          password: hash,
          street,
          houseNumber,
          zipCode,
          residence,
          balance: 0,
        });

        let user = await newUser.save();

        res.status(201).json(user);
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred",
    });
  }
};

// check email existing controller
const checkEmailExistingController = async (req, res) => {
  try {
    const { email } = req.body || {};

    // check user already existing
    const existingUser = await User.findOne({ email });

    res.status(200).json(existingUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!!",
    });
  }
};

// login user controller
const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user available
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: {
          email: "User not found! Please try again!!",
        },
      });
    }

    // check password correct or incorrect
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.status(500).json({
          error: "Server Error Occurred!",
        });
      }

      if (!result) {
        return res.status(400).json({
          error: {
            password: "Email or Password Incorrect!",
          },
        });
      }

      // prepare the user object to generate token
      const userObject = {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        balance: user.balance,
      };

      // generate token
      const token = jwt.sign(userObject, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
      });

      res.status(200).json({
        user: userObject,
        token,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!!",
    });
  }
};

module.exports = {
  createNewUserController,
  checkEmailExistingController,
  loginUserController,
};
