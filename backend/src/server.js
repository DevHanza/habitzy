import app from "./index.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `\nServer is running on port http://localhost:${PORT}/api/v1/`
      )
    );
  })
  .catch((err) => console.error("DB connection error:", err));
