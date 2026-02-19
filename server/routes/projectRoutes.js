const express = require("express");
const Project = require("../models/Project");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.use(protect); // Protect all routes in this file

// Create a new project (any authenticated user can create)
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const project = await Project.create({ name, owner: req.user._id });
    res.status(201).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating project", error: error.message });
  }
});

// Get user's projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ owner: req.user._id }, { members: req.user._id }],
    }).populate("owner", "name email");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects" });
  }
});

module.exports = router;
