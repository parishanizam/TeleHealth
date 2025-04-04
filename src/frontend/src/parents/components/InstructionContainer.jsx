/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 24, 2025
 * Purpose: Contains Instruction Container which holds all instruction types from the Instructions folder
 */

import InstructionStep from "../components/InstructionStep";

import matchingInstructions from "./Instructions/MatchingInstructions";
import repetitionInstructions from "./Instructions/RepetitionInstructions";
import quantifierInstructions from "./Instructions/QuantifierInstructions";
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
    <div className="flex flex-col gap-6 w-full max-w-5xl px-1 text-start">
      {instructions.map((step) => (
        <InstructionStep key={step.number} number={step.number}>
          {step.text}
        </InstructionStep>
      ))}
      <div className="bg-blue-100 p-4 rounded-2xl text-blue-700">
        The first question of each test is a <strong>Practice Question</strong>.
        This will not impact your results
      </div>
    </div>
  );
}
