import { describe, test } from "vitest";
import { tokenize } from "../../src/jsx-parser";
import { log } from "../helpers";

import { nativeDOMJsxString as jsxString } from "./jsx.factory";

describe("tokenize", () => {
  test("tokenizes a jsx string", () => {
    const tokens = tokenize(jsxString);
    // log(tokens);
  });
});
