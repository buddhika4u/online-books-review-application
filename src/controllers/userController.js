const User = require("../models/User");
const authService = require("../services/authService");
const bookService = require("../services/bookService");

// Task 6: Register New User
const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await authService.registerUser({ username, password });
    const token = authService.generateToken(user._id);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Task 7: Login as a Registered user
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = authService.generateToken(user._id);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  registerUser,
  loginUser,
};
