# Habit-Tracker

Habit Tracker with MERN Stack (React + Chakra UI)
<br/><br/>
![Habit Tracker Stack](https://go-skill-icons.vercel.app/api/icons?i=react,chakraui,js,html,css)

# Stack

- **M**ongoDB
- **E**xpress.js
- **R**eact
- **N**ode.js

Using:

- React Context API

### Frontend Libraries

- [Chakra UI](https://chakra-ui.com/)
- [React Router v7](https://reactrouter.com/)
- [Pragmatic Drag and Drop](https://github.com/atlassian/pragmatic-drag-and-drop)
- [Frimousse](https://github.com/liveblocks/frimousse)
- [check-password-strength](https://github.com/deanilvincent/check-password-strength)
- [Lucide Icons](https://lucide.dev/guide/packages/lucide-react)

### Backend Libraries

- [Mongoose](https://mongoosejs.com/)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

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

# Setup

### Configure .env file

Rename `.env.example` to `.env` and start adding the info.

###### JWT Token Secrets

You can use whatever for these secrets I prefer use this code generate a much more secure token.

```js
// Type 'node' in the terminal and paste this code
require("crypto").randomBytes(64).toString("hex");
// Output: d6a587c0a0ae1558081d29f292a38e0404232d2c05a16379e3ca120ab50745f2907671f1f11fa84e2f030c35bb3b3d26aa2f43348d6e1c10ec8008f2ed64922f"
```
