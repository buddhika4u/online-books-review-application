const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Task 6: Register New user
router.post("/register", userController.registerUser);

// Task 7: Login as a Registered user
router.post("/login", userController.loginUser);


module.exports = router;
