<p align="center">
  <img src="../frontend/public/habits-2.svg" alt="Habitzy Logo" height="100"/>
</p>

<h1 align="center">Habitzy</h1>
<p align="center">
  <strong>Habit Tracking Platform designed to build consistency.</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/v/release/DevHanza/habitzy" alt="Version"/>
  <img src="https://img.shields.io/github/license/DevHanza/habitzy" alt="License"/>
  <img src="https://img.shields.io/badge/node-24_LTS-darkgreen.svg" alt="Node"/>
  <img src="https://img.shields.io/badge/React-19.x-lightblue.svg" alt="React"/>
  <img src="https://img.shields.io/badge/docker-ready-blue.svg" alt="Docker"/>
  <!-- <img src="https://wakatime.com/badge/user/cf3817f9-1dca-4dc8-876a-c4ae6f6942cc/project/7d1a3222-8c10-4ee7-b5c3-56cb82fb1679.svg" alt="WakaTime"/> -->
</p>

![Dashboard Preview](https://github.com/user-attachments/assets/db40a3d7-4558-441c-8892-d6f71ac5164a)

## ✨ What is Habitzy?

**Habitzy** is a habit tracking platform designed to help users build consistency through gamification.

## 🎯 Features

- Create, track, edit, and delete habits
- Monitor daily progress with streaks and leaderboards
- Easy to use drag-and-drop habits ordering
- Secure JWT authentication & authorization
- Manage profiles and customizable settings
- Dockerized deployment

## 🔃 Quick Start

### Option A: Docker (Recommended)

```bash
# Development
docker compose -f docker-compose.dev.yml up --build

# Production
docker compose -f docker-compose.prod.yml up --build -d
```

### Option B: Manual Deployment

1. Install [Node.js](https://nodejs.org/en/download) _(v18.x+)_ and [MongoDB](https://www.mongodb.com/try/download/community) _(v8.2.3+)_.
2. Execute:

```bash
# Clone the repository
git clone https://github.com/DevHanza/habitzy.git

# Go to the repository folder
cd habitzy

# Install dependencies
(cd frontend && npm install) && (cd backend && npm install)
```

3. Set up environment variables by copying `.example.env` and renaming it to `.env` in both the `./frontend` and `./backend` folders

4. Start the application.

```bash
# Start the Frontend
cd ./frontend;
npm run dev;

# Start the Backend
cd ./backend;
npm run dev;

# For Production, refer to: https://www.frontendundefined.com/posts/tutorials/vite-production-build/
```

#### Useful links:

- MongoDB Atlas: https://www.mongodb.com/cloud/atlas/register
- MongoDB connection string guide: https://www.mongodb.com/resources/products/fundamentals/mongodb-connection-string
- Brevo SMTP setup guide:
  https://help.brevo.com/hc/en-us/articles/7959631848850-Create-and-manage-your-SMTP-keys

## 💻 Tech Stack

### Frontend

- React
- React Router
- [Chakra UI](https://chakra-ui.com/)
- [Pragmatic Drag and Drop](https://github.com/atlassian/pragmatic-drag-and-drop)
- [Frimousse](https://github.com/liveblocks/frimousse)
- [check-password-strength](https://github.com/deanilvincent/check-password-strength)
- [Lucide Icons](https://lucide.dev/guide/packages/lucide-react)
- [lottie-react](https://www.npmjs.com/package/lottie-react)
- [@number-flow/react](https://www.npmjs.com/package/@number-flow/react)

### Backend

- Node.js
- Express.js
- MongoDB
- [Mongoose](https://mongoosejs.com/)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- [nodemailer](https://www.npmjs.com/package/nodemailer)
- [nodemon](https://www.npmjs.com/package/nodemon)

### DevOps & Infrastructure

- Docker
- GitHub Actions
- Nginx

## 🏭 Architecture Overview

```text
Frontend (React)
      │
      ▼
API Calls (HTTP/REST)
      │
 ┌────┴────┐
 ▼         ▼
Express + Node.js Backend
      │
      ▼
MongoDB Database
```

## 🚀 Optimizations

- Improved performance using `React.memo`, `useMemo`, and `useCallback` for memoization.
- Indexed MongoDB queries to speed up data retrieval.
- Used React Context for simpler and lighter state management.

## 💪 Challenges Faced

<details>
  <summary>Preventing unnecessary re-renders of all habit cards when updating a single card.</summary>

```
✅ Solved using `React.memo` and memoized callbacks.
```

</details>

<details>
  <summary>Keeping drag-and-drop habit ordering synchronized between frontend state and backend.</summary>
  
  ```
  ✅ Solved with shared ordering utilities and optimistic state updates.
  ```
</details>

<details>
  <summary>Ending user streaks automatically without depending on external schedulars or systems.</summary>
  
  ```
  ✅ Solved with date comparison logic + storing dailylogs of users in DB.
  ```
</details>

<details>
  <summary>Sharing authentication state across multiple React contexts without circular re-render bugs.</summary>
  
  ```
  ✅ Solved by separating context responsibilities and memoizing provider values.
  ```
</details>

<details>
  <summary>Creating a Docker setup that works for both development and production environments.</summary>
  
  ```
  ✅ Solved using separate Docker Compose configurations.
  ```
</details>

## 📝 Lessons Learned

Building Habitzy helped me strengthen my understanding of:

- Managing authentication and backend communication using React Context.
- Practical use of React memoization techniques for performance optimization.
- JWT-based authentication and authorization workflows.
- Database indexing for improving query performance.
- Docker for both development and production deployment.

## ⚡ Planned Improvements

- [ ] Add optimistic UI updates
<!-- - [ ] Introduce unit testing for frontend/backend. -->

## 📁 Project Structure

```
  habitzy/
  ├── backend/
  │   ├── Dockerfile
  │   ├── package.json
  │   ├── package-lock.json
  │   └── src/
  │       ├── index.js              # App entry point
  │       ├── server.js             # Server bootstrap
  │       ├── config/
  │       │   └── db.js             # MongoDB connection setup
  │       ├── controllers/          # Business logic layer
  │       ├── middleware/           # Request middlewares
  │       ├── models/               # MongoDB schemas
  │       ├── routes/               # API routes
  │       └── utils/                # Helper functions
  │
  ├── frontend/
  │   ├── Dockerfile
  │   ├── index.html
  │   ├── vite.config.js
  │   ├── nginx.conf
  │   ├── package.json
  │   ├── package-lock.json
  │   ├── eslint.config.js
  │   ├── jsconfig.json
  │   ├── public/                   # Static assets
  │   ├── dist/                     # Production build output
  │   └── src/
  │       ├── main.jsx              # React entry point
  │       ├── App.jsx               # Root component
  │       ├── routes.jsx            # App routing
  │       ├── index.css
  │       ├── api/                 # API layer
  │       ├── assets/              # Images, animations, lottie files
  │       ├── components/          # Reusable UI components
  │       ├── context/             # Global state management
  │       ├── hooks/               # Custom React hooks
  │       ├── pages/               # App pages/routes
  │       ├── services/            # Service layer (if used)
  │       ├── theme/               # UI theme configuration
  │       └── utils/               # Helper utilities
  │
  ├── docker-compose.dev.yml
  ├── docker-compose.prod.yml
  └── LICENSE
```

## 📍 Contributing

Pull requests are welcome.

For major changes, please open an issue first to discuss proposed improvements.

## 📄 License

This project is licensed under the **MIT License** – free for personal and commercial use.

See [LICENSE](./LICENSE) for details.

_Hosted for free on [Cloudflare Pages.](https://pages.cloudflare.com/)_
