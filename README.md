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
