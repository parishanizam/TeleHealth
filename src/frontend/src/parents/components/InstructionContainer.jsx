import InstructionStep from "../components/InstructionStep";

import matchingInstructions from "./Instructions/MatchingInstructions";
import repetitionInstructions from "./Instructions/RepetitionInstructions";
import quantifierInstructions from "./Instructions/QuantifierInstructions";

// eslint-disable-next-line react/prop-types
export default function InstructionContainer({ type }) {
  let instructions = [];

  if (type === "matching") {
    instructions = matchingInstructions;
  }

  if (type === "repetition") {
    instructions = repetitionInstructions;
  }

  if (type === "quantifier") {
    instructions = quantifierInstructions;
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl px-4 text-start">
      {instructions.map((step) => (
        <InstructionStep key={step.number} number={step.number}>
          {step.text}
        </InstructionStep>
      ))}
    </div>
  );
}
