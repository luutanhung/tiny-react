import { VNodeType } from '../vnode';
import { tokenize, TokenType } from "./tokenizer";

export  function parseElement(tokens = [], tokenIdx) {
  if (tokens[tokenIdx].type !== TokenType.LSD) {
    throw new Error("parseElement: Expected < token.");
  }

  tokenIdx += 1;
  const htmlTag = tokens[tokenIdx].value;
  tokenIdx += 1;

  const elementProps = {};

  while (tokens[tokenIdx].type === TokenType.IDENTIFIER) {
    const key = tokens[tokenIdx].value;
    tokenIdx += 1;
    if (tokens[tokenIdx].type === TokenType.EQ) {
      tokenIdx += 1;
      if (
        ![TokenType.PROP_VALUE, TokenType.JS_EXPRESSION].includes(
          tokens[tokenIdx].type,
        )
      ) {
        throw new Error(
          "parseElement: Unexpected token following IDENTIFER token.",
        );
      } else {
        if (tokens[tokenIdx].type === TokenType.JS_EXPRESSION) {
          elementProps[key] = Function(`return ${tokens[tokenIdx].value}`)();
        } else {
          elementProps[key] = tokens[tokenIdx].value;
        }
        tokenIdx += 1;
      }
    } else {
      // Set boolean property.
      elementProps[key] = true;
    }
  }

  if (tokens[tokenIdx].type === TokenType.GRTD_SLASH) {
    return [
      {
        type: VNodeType.ELEMENT,
        tag: htmlTag,
        props: elementProps,
        children: [],
      },
      tokenIdx + 1,
    ];
  }

  if (tokens[tokenIdx].type !== TokenType.GRTD) {
    throw new Error("parseElement: Expected token >");
  }
  tokenIdx += 1;

  const children = [];
  while (
    tokens[tokenIdx].type !== TokenType.LSD_SLASH ||
    tokens[tokenIdx + 1].value !== htmlTag
  ) {
    if (tokens[tokenIdx].type === TokenType.LSD) {
      const [vnode, newTokenIdx] = parseElement(tokens, tokenIdx);
      children.push(vnode);
      tokenIdx = newTokenIdx;
    } else if (tokens[tokenIdx].type === TokenType.TEXT_NODE) {
      let words = [];
      while (tokens[tokenIdx].type === TokenType.TEXT_NODE) {
        words.push(tokens[tokenIdx].value);
        tokenIdx += 1;
      }
      children.push({
        type: VNodeType.TEXT,
        value: words.join(" "),
      });
    } else {
      throw new Error(
        "parseElement: Unexpected token " + tokens[tokenIdx].value,
      );
    }
  }

  tokenIdx += 2; // skip LSD_SLASH + IDENTIFIER/TAG
  if (tokens[tokenIdx].type !== TokenType.GRTD) {
    throw new Error("parseElement: Expected token >");
  }
  tokenIdx += 1;

  return [
    {
      type: VNodeType.ELEMENT,
      tag: htmlTag,
      props: elementProps,
      children,
    },
    tokenIdx,
  ];
  }

export function parseTokens(tokens = []) {
  let ast = {};
  let tokenIdx = 0;

  while (tokenIdx < tokens.length) {
    if (tokens[tokenIdx].type === TokenType.LSD) {
      const [astVNode, newTokenIdx] = parseElement(tokens, tokenIdx);
      ast = astVNode;
      tokenIdx = newTokenIdx;
    } else {
      tokenIdx += 1;
    }
  }

  return ast;
}

export function parseJSX(jsxString = "") {
  const tokens = tokenize(jsxString);
  return parseTokens(tokens);
}
