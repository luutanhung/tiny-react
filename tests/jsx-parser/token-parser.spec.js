import { beforeAll, describe, test } from "vitest";
import { tokenize } from "../../src/jsx-parser";
import { log, logDOM } from "../helpers";
import { Icon, complexJsxString as jsxString, JsxStringWithFragment, Title } from "./jsx.factory";
import { mount, parseJSX, parseTokens, registerComponent } from '../../src';

describe("parseToken", () => {
  beforeAll(() => {
    registerComponent(Title);
    registerComponent(Icon);
  });

  test("parses a list of tokens and return an ast", () => {
    const tokens = tokenize(jsxString);
    // log(tokens.map((token, idx) => [token, idx]));
    const ast = parseTokens(tokens);
    const container = document.createElement("div");
    mount(ast, container);
    logDOM(ast);
  });

  describe("parseJSX", () => {
    test("parses a JSX string", () => {
      const vdom = parseJSX(jsxString);
      const container = document.createElement("div");
      mount(vdom, container);
      logDOM(container);
    })

    test.only("parses a JSX string supporting Fragment", () => {
      const vdom = parseJSX(JsxStringWithFragment);
      // log(vdom);
      const container = document.createElement("div");
      mount(vdom, container);
      // logDOM(container);
    });
  });
});
