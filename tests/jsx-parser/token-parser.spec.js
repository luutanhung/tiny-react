import { describe, test } from "vitest";
import { parseTokens } from "../../src/jsx-parser/token-parser";
import { tokenize } from "../../src/jsx-parser";
import { jsxString } from "./tokenizer.spec";
import { log } from "../helpers";

describe("parseToken", () => {
  test.only("parses a list of tokens and return an ast", () => {
    const tokens = tokenize(jsxString);
    // log(tokens);
    const ast = parseTokens(tokens);
    // log(ast);
  });
});
