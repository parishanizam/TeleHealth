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
