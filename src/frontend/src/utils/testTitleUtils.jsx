/**
 * Author: Mitchell Weingust
 * Date: January 19, 2025
 * Purpose: Contains a helper method for formatting and displaying test titles in a consistent format
 */

export function formatTestTitle(questionBankId) {
  if (!questionBankId) return "Unknown Test";

  return questionBankId
    .split("-") // Split the string at the "-"
    .map(
      (word, index) =>
        index === 0
          ? word.charAt(0).toUpperCase() + word.slice(1) // Capitalize the Language
          : word.charAt(0).toUpperCase() + word.slice(1) // Capitalize the Test Type
    )
    .join(" - "); // Join them back with " - " separator
}
