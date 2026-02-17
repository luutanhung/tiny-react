import { isIdentifer } from "./utils";

export const TokenType = Object.freeze({
  LSD_SLASH: "LSD_SLASH", // </
  LSD: "LSD", // <
  GRTD_SLASH: "GRTD_SLASH", // />
  GRTD: "GRTD", // >
  PROP_VALUE: "PROP_VALUE",
  JS_EXPRESSION: "JS_EXPRESSION",
  EQ: "EQ",
  IDENTIFIER: "IDENTIFIER",
  TEXT_NODE: "TEXT_NODE",
  OPENING_FRAGMENT: "OPENING_FRAGMENT",
  CLOSING_FRAGMENT: "CLOSING_FRAGMENT",
});

/**
 * Breaks down jsx string into an array of tokens.
 * Each token object has a type and value attributes.
 */
export const tokenize = (jsxString = "") => {
  const tokens = [];
  jsxString = jsxString.trim();

  // Starting idx of the first token.
  let tokPos = 0;

  let inTag = false;

  if (jsxString[0] !== "<") {
    throw new Error("tokenize: Expected < at the start jsx string.");
  }

  while (tokPos < jsxString.length) {
    if (jsxString[tokPos] === "<") {
      inTag = true;
      // Start of a closing tag.
      if (jsxString[tokPos + 1] === "/") {
        if (jsxString[tokPos + 2] === ">") {
          tokens.push({ type: TokenType.CLOSING_FRAGMENT, value: "</>" });
          tokPos += 3;
        } else {
          tokens.push({ type: TokenType.LSD_SLASH, value: "</" });
          tokPos += 2;
        }
      } else if (jsxString[tokPos + 1] === ">") {
        tokens.push({ type: TokenType.OPENING_FRAGMENT, value: "<>" });
        tokPos += 2;
      } else {
        tokens.push({ type: TokenType.LSD, value: "<" });
        tokPos += 1;
      }
    } else if (jsxString[tokPos] === ">") {
      inTag = false;
      if (jsxString[tokPos - 1] === "/") {
        if (jsxString[tokPos - 2] === "<") {
          tokens.push({ type: TokenType.CLOSING_FRAGMENT, value: "</>" });
        } else {
          tokens.push({ type: TokenType.GRTD_SLASH, value: "/>" });
        }
        tokPos += 2;
      } else {
        tokens.push({ type: TokenType.GRTD, value: ">" });
        tokPos += 1;
      }
    } else if (["'", '"'].includes(jsxString[tokPos]) && inTag) {
      if (jsxString[tokPos - 1] === "=") {
        // Encounter string props.
        const correspondingClosingQuote = jsxString[tokPos];
        let propIdx = tokPos + 1;
        let propVal = "";
        while (jsxString[propIdx] !== correspondingClosingQuote) {
          propVal += jsxString[propIdx];
          propIdx += 1;
        }
        tokens.push({
          type: TokenType.PROP_VALUE,
          value: propVal,
        });
        tokPos = propIdx + 1;
      }
    } else if (isIdentifer(jsxString[tokPos])) {
      let identifierPos = tokPos;
      let identifierVal = "";
      while (isIdentifer(jsxString[identifierPos])) {
        identifierVal += jsxString[identifierPos];
        identifierPos += 1;
      }
      tokens.push({
        type: inTag ? TokenType.IDENTIFIER : TokenType.TEXT_NODE,
        value: identifierVal,
      });
      tokPos = identifierPos;
    } else if (
      !isIdentifer(jsxString[tokPos]) &&
      !inTag &&
      jsxString[tokPos] !== " "
    ) {
      let identifierPos = tokPos;
      let identiferVal = "";
      if (jsxString[identifierPos] === "\n") {
        tokPos += 1;
        continue;
      }
      while (
        !isIdentifer(jsxString[identifierPos]) &&
        !inTag &&
        ![" ", "\n"].includes(jsxString[identifierPos])
      ) {
        identiferVal += jsxString[identifierPos];
        identifierPos += 1;
      }
      tokens.push({
        type: TokenType.TEXT_NODE,
        value: identiferVal,
      });
      tokPos = identifierPos;
    } else if (jsxString[tokPos] === "{" && inTag) {
      // Encounter a javascript expression.
      let newTokPos = tokPos + 1;
      let jsExpr = "";
      let openingBraceCnt = 1;
      let closingBraceCnt = 0;
      while (openingBraceCnt !== closingBraceCnt) {
        if (jsxString[newTokPos] === "{") {
          openingBraceCnt += 1;
        } else if (jsxString[newTokPos] === "}") {
          closingBraceCnt += 1;
          if (openingBraceCnt === closingBraceCnt) break;
        }
        jsExpr += jsxString[newTokPos];
        newTokPos += 1;
      }
      tokPos = newTokPos + 1;
      tokens.push({
        type: TokenType.JS_EXPRESSION,
        value: jsExpr,
      });
    } else if (jsxString[tokPos] === "=") {
      tokens.push({
        type: TokenType.EQ,
        value: jsxString[tokPos],
      });
      tokPos += 1;
    } else {
      tokPos += 1;
    }
  }

  return tokens;
};
