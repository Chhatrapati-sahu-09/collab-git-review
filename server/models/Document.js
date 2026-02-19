const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    automergeBinary: { type: Buffer, default: null }, // We will use this in Phase 4
  },
  { timestamps: true },
);

module.exports = mongoose.model("Document", documentSchema);
