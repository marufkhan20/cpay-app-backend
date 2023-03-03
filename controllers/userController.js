const User = require("../models/User");

// get user controller
const getUserController = async (req, res) => {
  try {
    const { _id } = req.user || {};
    const user = await User.findById(_id);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred",
    });
  }
};

// get user by username controller
const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params || {};
    const { username: yourname } = req.user || {};

    const user = await User.findOne({ username });

    if (user?._id && user?.username !== yourname) {
      res.status(200).json(user);
    } else {
      res.status(200).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!",
    });
  }
};

module.exports = {
  getUserController,
  getUserByUsername,
};
