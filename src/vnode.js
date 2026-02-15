import { createLogger } from "vite";

export const VNodeType = Object.freeze({
  TEXT: "TEXT_NODE",
  ELEMENT: "ELEMENT_NODE",
  FRAGMENT: "FRAGMENT_NODE",
});

/**
 * Creates a Virtual DOM Node (vnode).
 *
 * This helper function builds a simple VNode object containing
 * a tag name, optional props, and optional children.
 *
 * Supports flexible arguments:
 * - If `props` is an array or string, it will be treated as `children`
 *  and `props` will default to an empty object.
 *
 * @param {string} [tag=""]
 * The HTML tag or component name for the VNode.
 *
 * @param {Object|Array|string} [props={}]
 * Optional properties/attributes for the VNode. If an array or string
 * is passed, it will be interpreted as `children`.
 *
 * @param {Array|string} [children=[]]
 * Optional children of the VNode. Can be an array of VNodes, strings,
 * or other renderable content.
 *
 * @returns {{
 *  tag: string,
 *  props: Object,
 *  children: Array|string,
 * }}
 *
 * @example
 * createVNode("div)
 *
 * @example
 * createVNode("div", { class: "btn btn-primary" })
 *
 * * @example
 * createVNode("div", { class: "box" }, ["click"])
 */
function createElementVNode(tag = "", props = {}, children = []) {
  if (Array.isArray(props) || typeof props === "string") {
    children = props;
    props = {};
  }

  const normalizedChildren = mapChildrenToVNodes(children);

  return {
    type: VNodeType.ELEMENT,
    tag,
    props,
    children: normalizedChildren,
  };
}

function createTextVNode(txt = "") {
  return {
    type: VNodeType.TEXT,
    value: txt,
  };
}

function mapChildToVNode(child) {
  if (typeof child === "string") {
    return createTextVNode(child);
  }
  return createElementVNode(child);
}

function mapChildrenToVNodes(children = []) {
  return Array.from(children)
    .filter((child) => child !== null && child !== undefined)
    .map((child) => mapChildToVNode(child));
}

export { createElementVNode as h, createTextVNode as hString };
