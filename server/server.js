require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Socket.io Setup with CORS
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  },
});

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Server is running perfectly" });
});

// We will mount routes here in Step 4
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/documents", require("./routes/documentRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));

// Socket.io Real-Time Sync Logic
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-document", (documentId) => {
    socket.join(documentId);
    console.log(`Socket ${socket.id} joined document: ${documentId}`);
  });

  socket.on("send-changes", ({ documentId, changes }) => {
    // Broadcast the CRDT changes to everyone ELSE in the room
    socket.to(documentId).emit("receive-changes", changes);
  });

  socket.on("new-comment", (documentId) => {
    // Broadcast to everyone else in the document room that a new comment was added
    socket.to(documentId).emit("receive-comment");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  // VERY IMPORTANT: Change app.listen to server.listen
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
