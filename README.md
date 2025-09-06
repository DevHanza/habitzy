# Habit-Tracker

Habit Tracker with MERN Stack (React + Chakra UI)

# Initial Planned Folder Structure

```
habit-tracker-frontend/
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

```
