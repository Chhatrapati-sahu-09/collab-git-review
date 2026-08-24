# Collab Code Review

Collaborative code review web application — React frontend (Vite) and Node/Express backend.

## Table of contents

- [Prerequisites](#prerequisites)
- [Quickstart](#quickstart)
- [Environment](#environment)
- [Run tests](#run-tests)
- [Project structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- Node.js 18+ (or compatible LTS)
- npm (or yarn)
- MongoDB (local or hosted) if running the server locally

## Quickstart

1. Clone the repository:

```bash
git clone git@github.com:Chhatrapati-sahu-09/collab-git-review.git
cd collab-git-review
```

2. Start the client (Vite):

```bash
cd client
npm install
npm run dev
```

3. Start the server (Express) in a separate terminal:

```bash
cd server
npm install
npm run dev
```

Default ports: client (Vite) 5173, server 3000.

## Environment

Create a `.env` file in the `server/` directory with values similar to:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/collab
JWT_SECRET=replace_with_secure_secret
```

Keep secrets out of source control and use a secrets manager for production.

## Run tests

Server tests (Jest/Mocha depending on project config):

```bash
cd server
npm test
```

Client tests (if present):

```bash
cd client
npm test
```

## Project structure

- `client/` — React + Vite frontend
- `server/` — Node/Express backend (routes, models, middleware, tests)

## Contributing

Contributions welcome. Typical workflow:

```bash
git checkout -b feature/your-feature
# implement changes
git add .
git commit -m "docs: add README or feat: ..."
git push -u origin feature/your-feature
```

Create a Pull Request against the `main` branch when ready.

## License

Specify your license here (e.g., MIT) or remove this section.

---

If you want, I can add a `client/README.md` with client-specific scripts and details, or generate API docs for the server.
