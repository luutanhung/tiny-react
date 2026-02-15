import { describe, test, expect } from "vitest";
import { createTextNode, mount } from "../mount";
import { log, logDOM } from "../helpers";
import { h } from "../vnode";

describe("mount", () => {
  test.only("creates a tree of html elements", () => {
    // const labelVDom = h("label", { for: "password-length" }, [
    //   "password length",
    // ]);
    // log(labelVDom);
    // const inputVDom = h("input", {
    //   id: "password-length",
    //   name: "password-length",
    // });
    // log(inputVDom);
    const vdom = h("div", {}, [
      h("form", {}, [
        h("label", { for: "password-length" }, ["password length"]),
        h("input", { id: "password-length", name: "password-length" }),
      ]),
      h("button", { type: "submit" }, ["submit"]),
    ]);
    log(vdom);
    // const container = document.createElement("div");
    // mount(vdom, container);
    // logDOM(container);
  });

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
