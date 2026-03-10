# SyncCode

Real-Time Collaborative Code Review Platform (CRDT Powered)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20-339933.svg?logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg?logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-black?logo=socketdotio)

---

## Overview

**SyncCode** is a real-time collaborative code editor and review platform built using the MERN stack and powered by **Conflict-Free Replicated Data Types (CRDTs)** via Automerge.

The platform enables multiple developers to edit and review code simultaneously without conflicts. Unlike traditional collaborative systems that depend on server-side locking or Operational Transformation (OT), SyncCode uses CRDTs to guarantee mathematically consistent state merging across distributed clients.

This design ensures reliable concurrent editing with no locking mechanisms and no merge conflicts.

---

## Live Demo

Frontend: *Add deployed frontend URL*
Backend API: *Add backend API URL*

---

## Core Features

### Real-Time Collaborative Editing

* Built on Automerge CRDT technology
* Multiple users can edit the same document concurrently
* Automatic state reconciliation across clients
* No locking or overwrite conflicts

---

### Optimistic UI with WebSockets

* Instant local updates for low latency
* Diff synchronization using Socket.io
* Room-based document collaboration
* Real-time update propagation

---

### Line-Based Code Reviews

* Attach comments to specific lines
* Threaded review discussions
* Comment resolution system
* Pull-request style review workflow

---

### Version History

* Immutable CRDT state snapshots
* Restore previous document versions
* Timestamp-based history
* Diff-based recovery mechanism

---

### Role-Based Access Control

Authentication and authorization include:

* JWT-based authentication
* Password hashing with bcrypt
* Role management

Supported roles:

* `admin`
* `reviewer`
* `contributor`

Protected API endpoints enforce access policies.

---

### Developer Experience

* Dark-first user interface
* CodeMirror editor integration
* Multi-user cursor indicators
* Live synchronization status
* Fully responsive interface

---

## Technology Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Automerge (CRDT engine)
* Socket.io Client
* CodeMirror 6
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Socket.io
* JWT Authentication
* bcrypt
* Jest and Supertest for testing

---

## System Architecture

SyncCode uses a distributed CRDT model instead of centralized document locking.

### Editing Flow

1. A user edits code in the CodeMirror editor.
2. Automerge calculates the state diff between document versions.
3. The diff is transmitted via Socket.io to other connected clients.
4. Remote clients apply the CRDT changes locally.
5. All document states converge without conflicts.
6. Binary document snapshots are stored in MongoDB.

### High-Level Architecture

```
Client A ─┐
           ├── Socket.io Server ─── MongoDB (Binary CRDT Storage)
Client B ─┘
```

Each client maintains a local CRDT state, applies remote updates, and periodically persists document snapshots.

---

## Project Structure

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

## Getting Started

### Prerequisites

* Node.js v18 or later
* MongoDB (local instance or MongoDB Atlas)

---

### Clone the Repository

```bash
git clone https://github.com/yourusername/synccode.git
cd synccode
```

---

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory:

```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend server:

```bash
npm run dev
```

---

## Testing

The backend includes integration tests implemented with:

* Jest
* Supertest
* In-memory MongoDB

Run tests using:

```bash
cd server
npm run test
```

---

## Performance Considerations

* Binary CRDT storage for efficient synchronization
* Room-based Socket.io scaling
* Optimistic local updates for responsiveness
* Snapshot persistence throttling
* Indexed MongoDB document retrieval

---

## Future Enhancements

* WebRTC peer-to-peer synchronization
* AI-powered code review assistance
* Visual merge and diff tools
* Multi-file collaborative workspace
* Team and organization management
* Docker-based deployment
* Kubernetes scaling

---

## Author

Chhatrapati Sahu
Full Stack MERN Developer

GitHub: https://github.com/Chhatrapati-sahu-09
LinkedIn: https://www.linkedin.com/in/chhatrpati-sahu-4b803130a/

---

## License

This project is licensed under the MIT License.
