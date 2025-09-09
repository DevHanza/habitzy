export const getToday = () => {
  const today = new Date();
  const options = { weekday: "short", month: "short", day: "2-digit" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return formattedDate; // "Mon, Sep 08"
};
