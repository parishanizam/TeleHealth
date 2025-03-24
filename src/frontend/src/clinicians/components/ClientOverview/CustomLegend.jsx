import React from "react";

/**
 * Recharts will pass a "payload" array describing each line's color & label.
 * We render them in a custom <div> with any styling we want.
 */
function CustomLegend({ payload }) {
  if (!payload || !payload.length) return null;

  return (
    <div
      style={{
        backgroundColor: "#E6F7FF",
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px 16px",
        fontSize: "16px",
        fontWeight: "bold",
        margin: "0 auto 16px", // "16px" bottom margin for spacing below legend
        textAlign: "center",
        display: "inline-block",
      }}
    >
      {payload.map((entry, index) => (
        <span
          key={`item-${index}`}
          style={{
            marginRight: 16,
            color: entry.color,
            whiteSpace: "nowrap",
          }}
        >
          {entry.value}
        </span>
      ))}
    </div>
  );
}

export default CustomLegend;
