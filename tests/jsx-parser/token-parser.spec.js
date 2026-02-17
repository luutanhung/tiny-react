import { describe, test } from "vitest";
import { parseTokens } from "../../src/jsx-parser/token-parser";
import { tokenize } from "../../src/jsx-parser";
import { log } from "../helpers";
import { complexJsxString as jsxString } from "./jsx.factory";

describe("parseToken", () => {
  test("parses a list of tokens and return an ast", () => {
    const tokens = tokenize(jsxString);
    // log(tokens.map((token, idx) => [token, idx]));
    const ast = parseTokens(tokens);
    // log(ast);
  });
});
