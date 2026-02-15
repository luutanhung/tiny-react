import { expect, test, describe } from "vitest";
import { h } from "../vnode";
import { log } from "../helpers";

describe("vnode", () => {
  describe("creates element nodes", () => {
    test("creates an element node", () => {
      const elNode = h("div", { class: "btn btn-priimary" });
      // console.log(elNode);
    });

    test("creates an element node with children", () => {
      const elNode = h("div", [
        "Inspect a node",
        h("span", ["Tree with a Keyboard"]),
      ]);
      log(elNode);
    });
  });

  test("creates a text node", () => {
    const textNode = h("Tiny React");
    // console.log(textNode);
  });

  test("creates a fragment node", () => {});
});
