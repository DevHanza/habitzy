function runOncePerDay(storageKey, callback) {
  if (!storageKey) {
    throw new Error("useOncePerDay: A unique 'key' must be provided");
  }

  const lastRun = localStorage.getItem(storageKey);
  const today = new Date().toDateString();

  if (!lastRun || lastRun !== today) {
    callback();
    localStorage.setItem(storageKey, today);
    return;
  }

  console.log("You've already ran this function for today.");
}

export default runOncePerDay;
