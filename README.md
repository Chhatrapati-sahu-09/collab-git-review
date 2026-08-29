# Collab Code Review

A collaborative code review web application that allows developers to work together, review code, and improve development workflows.

Built with React + Vite for the frontend and Node.js + Express for the backend.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quickstart](#quickstart)
- [Environment Variables](#environment-variables)
- [Run Tests](#run-tests)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Collaborative code review
- React-based frontend
- Fast development with Vite
- Node.js and Express backend
- JWT-based authentication
- MongoDB database integration
- REST API architecture
- Backend and frontend testing support

---

## Tech Stack

### Frontend

<p align="left">
  <img src="https://skillicons.dev/icons?i=react,vite,js" />
</p>

### Backend

<p align="left">
  <img src="https://skillicons.dev/icons?i=nodejs,express" />
</p>

### Database

<p align="left">
  <img src="https://skillicons.dev/icons?i=mongodb" />
</p>

### Tools and Platforms

<p align="left">
  <img src="https://skillicons.dev/icons?i=git,github,postman" />
</p>

### Authentication

<p align="left">
  <img src="https://skillicons.dev/icons?i=jwt" />
</p>

---

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+ or a compatible LTS version
- npm or yarn
- MongoDB (local or hosted)

---

## Quickstart

### 1. Clone the Repository

```bash
git clone git@github.com:Chhatrapati-sahu-09/collab-git-review.git
cd collab-git-review
```

### 2. Start the Client

Open a terminal and run:

```bash
cd client
npm install
npm run dev
```

The client runs by default at:

```text
http://localhost:5173
```

### 3. Start the Server

Open another terminal and run:

```bash
cd server
npm install
npm run dev
```

The server runs by default at:

```text
http://localhost:3000
```

---

## Environment Variables

Create a `.env` file inside the `server/` directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/collab
JWT_SECRET=replace_with_secure_secret
```

Keep secrets and sensitive credentials out of source control.

For production, use environment variables or a secure secrets manager.

---

## Run Tests

### Backend Tests

```bash
cd server
npm test
```

### Frontend Tests

If client tests are configured:

```bash
cd client
npm test
```

---

## Project Structure

```text
collab-git-review/
│
├── client/
│   ├── React + Vite frontend
│   └── ...
│
├── server/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── tests/
│   └── ...
│
└── README.md
```

---

## Contributing

Contributions are welcome.

### Create a Feature Branch

```bash
git checkout -b feature/your-feature
```

### Implement Your Changes

Make the required changes to the project.

### Stage Changes

```bash
git add .
```

### Commit Changes

```bash
git commit -m "feat: add your feature"
```

### Push Your Branch

```bash
git push -u origin feature/your-feature
```

Create a Pull Request against the `main` branch when your changes are ready.

---

## License

This project is currently unlicensed.

If you plan to distribute or open-source the project, consider adding an appropriate license such as the MIT License.

---

## Support

If you find this project useful, consider giving the repository a star on GitHub.
