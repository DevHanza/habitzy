import { useCallback } from "react";

export function useOncePerDay(storageKey, callback) {
  if (!storageKey) {
    throw new Error("useOncePerDay: A unique 'key' must be provided");
  }

  const run = useCallback(() => {
    const lastRun = localStorage.getItem(storageKey);
    const today = new Date().toDateString();

    if (!lastRun || lastRun !== today) {
      callback();
      localStorage.setItem(storageKey, today);
      return;
    }

    console.log("You've already ran this function for today.");
  }, [storageKey, callback]);

  return run;
}
