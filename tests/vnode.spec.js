import { expect, test, describe } from "vitest";
import { h } from "../src";
import { log } from "./helpers";

describe("vnode", () => {
  describe("creates element nodes", () => {
    test("creates a complex virtual dom", () => {
      const vdom = h("div", [
        h("form", [
          h("label", { for: "password-length" }, ["password length"]),
          h("input", { id: "password-length", name: "password-length" }),
        ]),
        h(
          "button",
          {
            type: "button",
            class: "btn btn-primary",
            onClick: () => {
              console.log("clicked.");
            },
          },
          ["submit"],
        ),
      ]);
      // log(vdom);
    });

    test("creates an element node", () => {
      const elNode = h("div", { class: "btn btn-primary" });
      // console.log(elNode);
    });

    test("creates an element node with children", () => {
      const elNode = h("div", [
        "Inspect a node",
        h("span", ["Tree with a Keyboard"]),
      ]);
      // log(elNode);
    });
  });

  test("creates a text node", () => {
    const textNode = h("Tiny React");
    // console.log(textNode);
  });

  test("creates a fragment node", () => {});
});
