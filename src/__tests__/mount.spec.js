import { describe, test, expect } from "vitest";
import { createTextNode } from "../mount";
import { logDOM } from "../helpers";

describe("mount", () => {
  describe("createTextNode", () => {
    test("creates a text node and append to parent", () => {
      const parent = document.createElement("span");
      const textContent = "Tiny React";
      const vdom = {
        children: textContent,
      };
      createTextNode(vdom, parent);
      expect(parent.textContent).toBe(textContent);
      // logDOM(parent);
    });
  });
});
