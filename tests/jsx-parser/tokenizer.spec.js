import { describe, test } from "vitest";
import { tokenize } from "../../src/jsx-parser";
import { log } from "../helpers";

import { nativeDOMJsxString as jsxString, JsxStringWithFragment } from "./jsx.factory";

describe("tokenize", () => {
  test("tokenizes a jsx string", () => {
    const tokens = tokenize(jsxString);
    // log(tokens);
  });

  test("tokenizes a jsx string supporting fragment", () => {
    const tokens = tokenize(JsxStringWithFragment);
    // log(tokens);
  });
});
