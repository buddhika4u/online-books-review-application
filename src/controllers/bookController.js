const Book = require("../models/Book");

// Task 1: Get the book list available in the shop
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Task 2: Get the books based on ISBN
const getBooksByISBN = async (req, res) => {
  const { isbn } = req.params;
  try {
    const books = await Book.find({ ISBN: isbn });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Task 3: Get all books by Author
const getBooksByAuthor = async (req, res) => {
  const { authorName } = req.params;

  try {
    const books = await Book.find({ author: authorName });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Task 4: Get all books based on Title
const getBooksByTitle = async (req, res) => {
  const { bookTitle } = req.params;

  try {
    const books = await Book.find({
      title: { $regex: new RegExp(bookTitle, "i") },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Task 5: Get book Review
const getBookReview = async (req, res) => {
  const { bookId } = req.params;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Return information about each review, including reviewId
    const reviews = book.reviews.map((review) => ({
      reviewId: review._id,
      userId: review.userId,
      review: review.review,
    }));
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllBooks,
  getBooksByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  getBookReview,
};
