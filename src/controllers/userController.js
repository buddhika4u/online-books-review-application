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

// Task 8: Add/Modify a book review (Only for logged-in users)
const addModifyReview = async (req, res) => {
  const { bookId, review } = req.body;
  const userId = req.userId;

  try {
    // Use the bookService to add or modify a review
    const result = await bookService.addOrUpdateReview(userId, bookId, review);

    // Check the result and send the appropriate response
    if (result.error) {
      res.status(404).json({ error: result.error });
    } else {
      res.json({ success: result.success });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Task 9: Delete book review added by that particular user (Only for logged-in users)
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.userId;

  try {
    // Use the bookService to delete a review
    const result = await bookService.deleteReview(userId, reviewId);

    // Check the result and send the appropriate response
    if (result.error) {
      res.status(404).json({ error: result.error });
    } else {
      res.json({ success: "Review deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  addModifyReview,
  deleteReview,
};
