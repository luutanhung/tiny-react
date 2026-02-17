import { beforeAll, describe, test } from "vitest";
import { parseJSX, parseTokens } from "../../src/jsx-parser/token-parser";
import { tokenize } from "../../src/jsx-parser";
import { log, logDOM } from "../helpers";
import { Icon, complexJsxString as jsxString, Title } from "./jsx.factory";
import { mount } from '../../src';
import { registerComponent } from '../../src/helpers';

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

  test.only("parseJSX", () => {
    const vdom = parseJSX(jsxString);
    const container = document.createElement("div");
    mount(vdom, container);
    logDOM(container);
  });
});
