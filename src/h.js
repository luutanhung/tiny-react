export const VDOM_TYPE = Object.freeze({
  TEXT: "text",
  ELEMENT: "element",
  FRAGMENT: "fragment",
});

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
