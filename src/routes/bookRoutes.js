const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");

// Task 1: Get the book list available in the shop
router.get("/books", bookController.getAllBooks);

// Task 2: Get the books based on ISBN
router.get("/books/isbn/:isbn", bookController.getBooksByISBN);

// Task 3: Get all books by Author
router.get("/books/author/:authorName", bookController.getBooksByAuthor);

// Task 4: Get all books based on Title
router.get("/books/title/:bookTitle", bookController.getBooksByTitle);

// Task 5: Get book Review
router.get(
  "/books/reviews/:bookId",
  authMiddleware.authenticate,
  bookController.getBookReview
);

module.exports = router;
