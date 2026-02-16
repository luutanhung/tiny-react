import { describe, test } from "vitest";
import { tokenize } from "../../src/jsx-parser";
import { log } from "../helpers";

export const jsxString = `
  <div className="card shadow-sm p-4">
    <h2 className="text-lg font-bold">Quick Task</h2>
    <p className="text-gray-600">Review PR #104</p>
    <button
      className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
      onClick={() => completeTask(104)}
    >
      Complete
    </button>
  </div>
  `;

describe("tokenize", () => {
  test("tokenizes a jsx string", () => {
    const tokens = tokenize(jsxString);
    // log(tokens);
  });
});
