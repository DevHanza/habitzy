import jwt from "jsonwebtoken";

export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId, device) => {
  return jwt.sign({ userId, device }, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
};

export const isTokenExpired = (token) => {
  const payload = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);

  const now = Math.floor(new Date() / 1000);
  const expiresAt = payload?.exp;

  return expiresAt < now;
};
