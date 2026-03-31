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

