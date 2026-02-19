# 🚀 SyncCode ⚡  
## Real-Time Collaborative Code Review Platform (CRDT Powered)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20-339933.svg?logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg?logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-black?logo=socketdotio)

---

## 🧠 Overview

**SyncCode** is a high-performance, real-time collaborative code editor and review platform built using the MERN stack and powered by **Conflict-Free Replicated Data Types (CRDTs)** via Automerge.

Unlike traditional collaborative systems that rely on server-side locking or Operational Transformation (OT), SyncCode ensures mathematically guaranteed, conflict-free state merging across distributed clients.

> No locks.  
> No merge conflicts.  
> True concurrent editing.

---

## 🌍 Live Demo

🔗 **Live App:** _Insert your deployed frontend URL_  
🔗 **API Endpoint:** _Insert your backend URL_

---

## ✨ Core Features

### 🔁 Conflict-Free Real-Time Editing
- Powered by Automerge (CRDT)
- Multiple users can type on the same line simultaneously
- Automatic mathematical state reconciliation
- No locking or overwrite conflicts

---

### ⚡ Optimistic UI + WebSockets
- Instant local state updates
- Socket.io-based diff broadcasting
- Near-zero perceived latency
- Room-based document isolation

---

### 💬 Threaded Line-by-Line Reviews
- Attach comments directly to specific line numbers
- Threaded replies
- Resolve comment threads
- GitHub-style PR review experience in real-time

---

### 🕒 Immutable Version History
- Each CRDT state snapshot preserved
- Restore previous document versions
- Timestamp-based timeline
- Diff-based recovery

---

### 🔐 Role-Based Access Control (RBAC)
- JWT authentication
- Password hashing via bcrypt
- Roles:
  - `admin`
  - `reviewer`
  - `contributor`
- Protected REST endpoints

---

### 🎨 Premium Developer UX
- Dark-first UI
- Glassmorphism modals
- CodeMirror integration
- Multi-user cursor indicators
- Live sync status indicator
- Fully responsive layout

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Automerge (CRDT Engine)
- Socket.io Client
- CodeMirror 6
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Socket.io
- JWT Authentication
- Bcrypt
- Jest + Supertest

---

## 🏗️ System Architecture

SyncCode uses a distributed CRDT model instead of centralized locking.

### Editing Flow

1. User types in CodeMirror.
2. Automerge calculates the binary diff between document states.
3. The diff is emitted via Socket.io to the document room.
4. Other clients apply the CRDT changes locally.
5. Merged state remains mathematically conflict-free.
6. Full binary document state is persisted in MongoDB.

---

### High-Level Architecture

```
Client A ─┐
           ├──> Socket.io Server ───> MongoDB (Binary CRDT Storage)
Client B ─┘
```

Each client:
- Maintains local CRDT state
- Applies remote diffs
- Periodically persists snapshots

---

## 📁 Project Structure

```
synccode/
│
├── client/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── context/
│   └── services/
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── sockets/
│   └── tests/
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (Local or Atlas)

---

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/synccode.git
cd synccode
```

---

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create `.env` in `server/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
```

Start backend:

```bash
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash
cd ../client
npm install
```

Create `.env` in `client/`:

```
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

---

## 🧪 Testing

Backend includes integration tests using:

- Jest
- Supertest
- In-memory MongoDB

Run tests:

```bash
cd server
npm run test
```

---

## 📈 Performance Considerations

- Binary CRDT storage for efficient network transfer
- Room-based Socket.io scaling
- Optimistic local state updates
- Snapshot persistence throttling
- Indexed MongoDB document retrieval

---

## 🔮 Future Enhancements

- WebRTC peer-to-peer sync layer
- AI-powered code review suggestions
- Merge diff visualizer
- Multi-file workspace support
- Organization-level team management
- Dockerized deployment
- Kubernetes scaling

---

## 👨‍💻 Author

**Chhatrapati Sahu**  
Full Stack MERN Developer  

GitHub: https://github.com/Chhatrapati-sahu-09  
LinkedIn: https://www.linkedin.com/in/chhatrpati-sahu-4b803130a/  

---

## 📄 License

This project is licensed under the MIT License.
