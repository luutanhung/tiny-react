export const VDOM_TYPE = Object.freeze({
  TEXT: "TEXT",
  ELEMENT: "element",
  FRAGMENT: "fragment",
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
 *  chidlren: Array|string,
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
function createVNode(tag = "", props = {}, children = []) {
  if (Array.isArray(props) || typeof props === "string") {
    children = props;
    props = {};
  }

  return {
    tag,
    props,
    children,
  };
}

export { createVNode as h };
