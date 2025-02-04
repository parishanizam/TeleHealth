export const formatDate = (date) => {
  if (!date) return "Invalid date";

  const dateObj = new Date(date);
  if (isNaN(dateObj)) {
    console.error("Invalid date:", date);
    return "Invalid date";
  }

  return dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
