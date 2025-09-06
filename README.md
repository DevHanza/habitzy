# Habit-Tracker

Habit Tracker with MERN Stack (React + Chakra UI)

# Stack

- **M**ongoDB
- **E**xpress.js
- **R**eact
- **N**ode.js

Using:

- React Context API

### Frontend Libraries

- Chakra UI
- React Router v7

### Backend Libraries

- Mongoose
- cors
- dotenv

# Initial Planned Folder Structure

```
frontend/
│── public/                # Static assets (favicon, index.html, etc.)
│── src/
│   ├── assets/            # Images, icons, fonts if needed
│   ├── components/        # Reusable UI components (buttons, inputs, navbars)
│   │   ├── HabitCard.jsx
│   │   ├── Layout.jsx
│   │   └── ...
│   ├── context/           # React Context providers
│   │   ├── HabitContext.jsx
│   │   └── AuthContext.jsx (if login is needed)
│   ├── hooks/             # Custom hooks
│   │   ├── useHabits.js
│   │   └── useAuth.js
│   ├── pages/             # Route-level components
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── ...
│   ├── services/          # API calls (fetch/axios)
│   │   └── habitService.js
│   ├── theme/             # Chakra UI theme overrides
│   │   └── index.js
│   ├── utils/             # Helper functions (date formatter, validators, etc.)
│   │   └── dateUtils.js
│   ├── App.jsx            # App root with Router + Providers
│   ├── index.js           # Entry point (ReactDOM.render)
│   └── routes.jsx         # Centralized React Router config
│
├── .env                   # API base URLs, secrets
├── package.json
└── README.md



backend/
│
├── src/
│   ├── config/          # App config (DB connection, env setup)
│   │   └── db.js
│   ├── models/          # Data access layer (talk to DB)
│   │   └── habitModel.js
│   ├── controllers/     # Business logic (uses models)
│   │   └── habitController.js
│   ├── routes/          # API routes (maps endpoints to controllers)
│   │   └── habitRoutes.js
│   ├── utils/           # Helper functions (optional)
│   ├── index.js         # Express app setup (middleware, routes)
│   └── server.js        # Starts server
│
└── package.json

```
