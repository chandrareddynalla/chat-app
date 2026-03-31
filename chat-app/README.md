# Chat App

## Overview
A premium **MERN** (MongoDB, Express, React, Node.js) real‑time chat application with a modern glass‑morphic UI. It supports user authentication, private rooms, media uploads, and live WebSocket communication.

---

## Tech Stack & Versions
| Layer | Technology | Version |
|-------|------------|---------|
| **Backend** | Node.js | `v20.11.0` |
| | Express | `4.19.2` |
| | MongoDB (driver) | `6.7.0` |
| | Socket.io | `4.7.5` |
| **Frontend** | React | `18.3.0` |
| | Vite (build) | `5.2.0` |
| | Socket.io‑client | `4.7.5` |
| | CSS (Vanilla) | — |
| **Development** | npm | `10.5.0` |

> Ensure the above versions (or newer) are installed. You can check versions with `node -v`, `npm -v`.

---

## Project Structure
```
chat-app/
├─ client/                 # React front‑end
│  ├─ src/
│  │  ├─ components/      # UI components (AuthForm, UserList, MessageInput, …)
│  │  ├─ styles/          # Global CSS (index.css)
│  │  └─ main.jsx
│  └─ vite.config.js
├─ server/                 # Express back‑end
│  ├─ src/
│  │  ├─ controllers/    # Route handlers (room.controller.js, …)
│  │  ├─ models/         # Mongoose schemas (Message.js, User.js, …)
│  │  ├─ routes/         # API routes
│  │  └─ server.js       # Entry point
│  └─ package.json
├─ .env.example            # Example environment variables
├─ package.json            # Root scripts (optional)
└─ README.md               # **You are here**
```

---

## Prerequisites
- **Node.js** (v20+) and **npm** installed.
- **MongoDB** instance (local or Atlas). Create a database named `chat-app`.
- (Optional) **Git** for version control.

---

## Setup Instructions
### 1. Clone the repository
```bash
git clone <repo‑url> chat-app
cd chat-app
```
### 2. Install dependencies
```bash
# Server dependencies
cd server
npm install
# Client dependencies
cd ../client
npm install
```
### 3. Configure environment variables
Copy the example file and fill in your values:
```bash
cp .env.example .env   # in the root or inside server folder as required
```
Typical variables:
```
PORT=5000                # Server port
MONGO_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your_secret_key
```
### 4. Run the application (development mode)
```bash
# In one terminal – start the backend
cd server
npm run dev   # uses nodemon or node --watch

# In another terminal – start the frontend
cd ../client
npm run dev   # Vite dev server (http://localhost:5173)
```
The client will proxy API calls to `http://localhost:5000` (configured in `vite.config.js`).

---

## Building for Production
```bash
# Build client assets
cd client
npm run build

# Start server in production mode
cd ../server
npm start  
```


## Publishing to GitHub (including node_modules)

> **Warning**: Generally `node_modules` should be excluded via `.gitignore`. If you need to push them (e.g., for CI without install), you can do so, but the repo will be large.

### Steps

1. Ensure you have a GitHub account and the remote repository created (e.g., `git@github.com:username/chat-app.git`).

2. Initialize git (if not already):
```bash
git init
git add .
```

3. (Optional) If you want to keep `node_modules`, **do not** add a `.gitignore` entry for it. Otherwise, remove `node_modules` from `.gitignore`.

4. Commit:
```bash
git commit -m "Initial commit with node_modules"
```

5. Add remote and push:
```bash
git remote add origin https://github.com/your-username/chat-app.git
git branch -M main
git push -u origin main
```

### Using Git LFS for large packages

If the repo becomes >100 MB, enable Git LFS:
```bash
git lfs install
git lfs track "*.node"
git add .gitattributes
git commit -m "Configure LFS"
git push
```

### Best practice

Usually you should keep `node_modules` out of the repo and rely on `npm install` after cloning:
```bash
npm install
```

But the above steps show how to push it if required.
