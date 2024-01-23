const Book = require("../models/Book");

/// Task 8: Add or modify a review for a book
const addOrUpdateReview = async (userId, bookId, review) => {
  try {
    // Find the book by ID
    const book = await Book.findById(bookId);

    // Check if the book exists
    if (!book) {
      return { error: "Book not found" };
    }

    // Find the index of the user's existing review
    const userReviewIndex = book.reviews.findIndex(
      (r) => String(r.userId) === String(userId)
    );

    // If the user has already reviewed this book, modify the existing review
    if (userReviewIndex !== -1) {
      book.reviews[userReviewIndex].review = review;
    } else {
      // If the user is adding a new review, push it to the reviews array
      book.reviews.push({ userId, review });
    }

    // Save the updated book to the database
    await book.save();

    return { success: "Review added or modified successfully" };
  } catch (error) {
    console.error("Error in addOrUpdateReview service:", error);
    throw error;
  }
};

// Task 9: Delete book review added by that particular user (Only for logged-in users)
const deleteReview = async (userId, reviewId) => {
  try {
    // Find the book that contains the review to be deleted
    const book = await Book.findOne({ "reviews._id": reviewId });

    // Check if the book exists
    if (!book) {
      return { error: "Book not found" };
    }

    // Find the index of the review to be deleted
    const reviewIndex = book.reviews.findIndex(
      (r) => String(r._id) === String(reviewId)
    );

    // Check if the logged-in user is the author of the review
    if (String(book.reviews[reviewIndex].userId) !== String(userId)) {
      return { error: "Unauthorized to delete this review" };
    }

    // Remove the review from the reviews array
    book.reviews.splice(reviewIndex, 1);

    // Save the updated book to the database
    await book.save();

    return { success: "Review deleted successfully" };
  } catch (error) {
    console.error("Error in deleteReview service:", error);
    throw error;
  }
};

module.exports = {
  addOrUpdateReview,
  deleteReview,
};
