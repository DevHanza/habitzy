# Habit Tracker

Habit Tracker with MERN Stack (React + Chakra UI)
<br/><br/>
![GitHub Release](https://img.shields.io/github/v/release/DevHanza/Habit-Tracker-React)
[![wakatime](https://wakatime.com/badge/user/cf3817f9-1dca-4dc8-876a-c4ae6f6942cc/project/7d1a3222-8c10-4ee7-b5c3-56cb82fb1679.svg)](https://wakatime.com/badge/user/cf3817f9-1dca-4dc8-876a-c4ae6f6942cc/project/7d1a3222-8c10-4ee7-b5c3-56cb82fb1679)

![Habit Tracker Thumbnail](https://github.com/user-attachments/assets/db40a3d7-4558-441c-8892-d6f71ac5164a)

## How to run locally?
### 🔻 Prerequisites
-  [Node.js](https://nodejs.org/en/download) _(v18.x+ recommended)_
-  [MongoDB](https://www.mongodb.com/try/download/community) _(v8.2.3+ recommended)_

```bash
# Clone the repository
git clone https://github.com/DevHanza/Habit-Tracker-React.git

# Go to the repository folder
cd Habit-Tracker-React

# Install dependencies
(cd frontend && npm install) && (cd backend && npm install)
```


### 🔻 Setup Frontend
#### Configure .env file
Rename `.env.example` to `.env`, then fill in the required values.
Most of the variables are self-explanatory and can be understood by reading the `.env` file. 

#### Run
```bash
# Install frontend dependencies
cd frontend
npm install

# Start the dev server
npm run dev
```
_For production deployment instructions, please read [here](https://www.frontendundefined.com/posts/tutorials/vite-production-build/)._

### 🔻 Setup Backend
#### Configure .env file
Rename `.env.example` to `.env`, then fill in the required values.

Most of the variables are self-explanatory and can be understood by reading the `.env` file. 
Below are instructions for obtaining only the values that may need additional setup.

##### 🔹 MongoDB Connection String - `MONGO_URI`
You can get this by setting up MongoDB locally or by creating a [Free MongoDB account](https://www.mongodb.com/cloud/atlas/register).
For more information, read [here](https://www.mongodb.com/resources/products/fundamentals/mongodb-connection-string).

##### 🔹 JWT Token Secrets - `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`
You can use any value for these secrets. However, it is recommended to generate a strong and secure random value.

You can generate one using Node.js with the following steps:
```js
// Run `node` in your terminal, then paste this:
require("crypto").randomBytes(64).toString("hex");

// Example output:
// d6a587c0a0ae1558081d29f292a38e0404232d2c05a16379e3ca120ab50745f2907671f1f11fa84e2f030c35bb3b3d26aa2f43348d6e1c10ec8008f2ed64922f
```
##### 🔹 SMTP Credentials - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_KEY`, `FROM_EMAIL`
I used Brevo to configure SMTP. You can follow their documentation for setup [instructions](https://help.brevo.com/hc/en-us/articles/7959631848850-Create-and-manage-your-SMTP-keys).

## Stack
![Habit Tracker Stack](https://go-skill-icons.vercel.app/api/icons?i=react,nodejs,mongodb,express)

#### Frontend Libraries

- [Chakra UI](https://chakra-ui.com/)
- [React Router v7](https://reactrouter.com/)
- [Pragmatic Drag and Drop](https://github.com/atlassian/pragmatic-drag-and-drop)
- [Frimousse](https://github.com/liveblocks/frimousse)
- [check-password-strength](https://github.com/deanilvincent/check-password-strength)
- [Lucide Icons](https://lucide.dev/guide/packages/lucide-react)
- [lottie-react](https://www.npmjs.com/package/lottie-react)

#### Backend Libraries

- [Mongoose](https://mongoosejs.com/)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- [nodemailer](https://www.npmjs.com/package/nodemailer)
- [nodemon](https://www.npmjs.com/package/nodemon)
