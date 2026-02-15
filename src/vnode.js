import { isHTMLTag } from "./helpers";

export const VNodeType = Object.freeze({
  TEXT: "TEXT_NODE",
  ELEMENT: "ELEMENT_NODE",
  FRAGMENT: "FRAGMENT_NODE",
});

/**
 * Creates a Virtual Element Node.
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

function createFragmentVNode(vNodes) {
  return {
    type: VNodeType.FRAGMENT,
    children: mapChildrenToVNodes(vNodes),
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

/**
 * Creates a Virtual DOM node (vnode).
 *
 * - If tag has the value of `FRAGMENT_NODE`, creates a Fragment Node.
 * - If tag is not a valid tag name, creates a Text node with value of tag.
 * - Otherwise, creates an Element Node.
 */
function createVNode(tag = "", props = {}, children = []) {
  if (typeof tag !== "string") {
    throw new TypeError("createVNode: tag must be a valid string.");
  }

  if (tag === VNodeType.FRAGMENT) {
    if (normalizedChildren.length === 0) {
      throw new Error(
        "createVNode: Fragment virtual node must have children nodes.",
      );
    }
    return createFragmentVNode(children);
  }

  if (isHTMLTag(tag)) {
    return createElementVNode(tag, props, children);
  }

  return createTextVNode(tag);
}

export {
  createVNode as h,
  createElementVNode as hElement,
  createTextVNode as hString,
  createFragmentVNode as hFragment,
};
