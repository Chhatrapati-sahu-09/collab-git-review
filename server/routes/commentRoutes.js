const express = require("express");
const Comment = require("../models/Comment");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.use(protect);

// Create a new comment on a specific line
router.post("/", async (req, res) => {
  try {
    const { documentId, lineNumber, text } = req.body;
    const comment = await Comment.create({
      documentId,
      author: req.user._id,
      lineNumber,
      text,
    });

    // Populate author data before sending back to frontend
    await comment.populate("author", "name email");

    res.status(201).json(comment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating comment", error: error.message });
  }
});

// Get all comments for a specific document
router.get("/document/:documentId", async (req, res) => {
  try {
    const comments = await Comment.find({ documentId: req.params.documentId })
      .populate("author", "name")
      .sort({ lineNumber: 1, createdAt: 1 }); // Sort by line number, then time
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
});

module.exports = router;
