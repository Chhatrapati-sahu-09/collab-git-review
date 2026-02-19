const express = require("express");
const Document = require("../models/Document");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.use(protect);

// Create a new document
router.post("/", async (req, res) => {
  try {
    const { title, projectId } = req.body;
    const document = await Document.create({ title, projectId });
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: "Error creating document" });
  }
});

// Get documents by project ID
router.get("/project/:projectId", async (req, res) => {
  try {
    const documents = await Document.find({ projectId: req.params.projectId });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching documents" });
  }
});

// Get a single document by ID
router.get("/:id", async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document)
      return res.status(404).json({ message: "Document not found" });
    res.json(document);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching document", error: error.message });
  }
});

// Update document's CRDT binary state
router.put(
  "/:id",
  express.raw({ type: "application/octet-stream", limit: "10mb" }),
  async (req, res) => {
    try {
      // We use express.raw to handle the incoming binary Buffer from Automerge
      const document = await Document.findByIdAndUpdate(
        req.params.id,
        { automergeBinary: req.body },
        { new: true },
      );
      res.json({ message: "Document state saved successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error saving document state", error: error.message });
    }
  },
);

module.exports = router;
