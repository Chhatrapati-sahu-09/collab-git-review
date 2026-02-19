const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lineNumber: { type: Number, required: true },
    text: { type: String, required: true },
    resolved: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Comment", commentSchema);
