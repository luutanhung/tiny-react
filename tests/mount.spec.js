import { describe, test, expect } from "vitest";
import { createTextNode, mount } from "../src/dom/mount";
import { logDOM } from "./helpers";
import { h } from "../src";

describe("mount", () => {
  test("creates a tree of html elements", () => {
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
    const container = document.createElement("div");
    mount(vdom, container);
    // logDOM(container);
    // logDOM(container.querySelector("button"));
  });

  describe("createTextNode", () => {
    test("creates a text node and append to parent", () => {
      const parent = document.createElement("span");
      const textContent = "Tiny React";
      const vdom = {
        value: textContent,
      };
      createTextNode(vdom, parent);
      expect(parent.textContent).toBe(textContent);
      // logDOM(parent);
    });
  });
});
