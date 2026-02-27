import normalizeDate from "./normalizeDate";

function runOncePerDay(storageKey, callback) {
  if (!storageKey) {
    throw new Error("useOncePerDay: A unique 'key' must be provided");
  }

  const lastRun = localStorage.getItem(storageKey);
  const today = normalizeDate().toISOString();

  if (!lastRun || lastRun !== today) {
    callback();
    localStorage.setItem(storageKey, today);
    return true;
  }
  console.log("You've already ran this function for today.");
  return false;
}

export default runOncePerDay;
