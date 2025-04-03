/**
 * Author: Mitchell Weingust
 * Date: January 19, 2025
 * Purpose: Contains a helper method for displaying dates in a consistent format
 */

export const formatDate = (date) => {
  if (!date) return "Invalid date";

  let dateObj;

  // Check if date is a string in the format "YYYY-MM-DD"
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    // Split the date string and create a date object in local time
    const [year, month, day] = date.split("-");
    dateObj = new Date(Number(year), Number(month) - 1, Number(day));
  } else {
    // Otherwise, create a date object normally
    dateObj = new Date(date);
  }

  if (isNaN(dateObj.getTime())) {
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
