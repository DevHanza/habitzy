import { verifyAccessToken } from "../utils/jwt.js";

export function authenticateAccessToken(req, res, next) {
  try {
    //
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    console.log(`token: ${token} \n`);

    if (!token) return res.sendStatus(401);

    const payload = verifyAccessToken(token);
    console.log(payload);

    // Send the userId to the route
    req.user = {
      userId: payload.userId,
    };

    next();
    //
  } catch (err) {
    //
    res.status(400).json({ message: err.message });
    //
  }
}
