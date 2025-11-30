function isExpired(expiresAt) {
  const now = Math.floor(new Date() / 1000);
  return expiresAt < now;
}

export default isExpired;
