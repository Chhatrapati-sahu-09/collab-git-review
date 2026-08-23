# Collab Code Review

Full-stack collaborative code review application (React client + Node/Express server).

## Requirements

- Node.js 18+ (or compatible LTS)
- npm or yarn

## Quickstart

Clone the repo and install dependencies for both client and server.

```bash
git clone <repo-url>
cd collab-code-review

# Client
cd client
npm install
npm run dev

# In a separate terminal: Server
cd ../server
npm install
npm run dev
```

The client runs via Vite (default port 5173). The server runs on port 3000 by default.

## Environment

Create a `.env` file in the `server/` folder with the following variables (example):

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/collab
JWT_SECRET=your_jwt_secret_here
```

## Tests

Run server tests:

```bash
cd server
npm test
```

## Project Structure

- `client/` - React (Vite) frontend
- `server/` - Node/Express backend, routes, models, and tests

## Notes

- See `client/README.md` for any client-specific details.
- Update `.env` with secure secrets before deploying.

If you'd like, I can expand sections (deployment, API docs, contributors).
