const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Task 6: Register New user
router.post("/register", userController.registerUser);

// Task 7: Login as a Registered user
router.post("/login", userController.loginUser);

// Task 8: Add/Modify a book review (Only for logged-in users)
router.post(
  "/reviews",
  authMiddleware.authenticate,
  userController.addModifyReview
);

// Task 9: Delete book review added by that particular user (Only for logged-in users)
router.delete(
  "/reviews/:reviewId",
  authMiddleware.authenticate,
  userController.deleteReview
);

module.exports = router;
