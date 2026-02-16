import { setProps } from "./helpers/attribute";
import { VNodeType } from "./vnode";

export function mount(vdom, parentEl) {
  const { type: typeOfVDom } = vdom;

  if (typeOfVDom === VNodeType.TEXT) {
    createTextNode(vdom, parentEl);
  } else if (typeOfVDom === VNodeType.ELEMENT) {
    createElementNode(vdom, parentEl);
  } else if (typeOfVDom === VNodeType.FRAGMENT) {
    createFragmentNode(vdom, parentEl);
  } else {
    throw new TypeError("mount: type of VDom must be VNodeType.");
  }
}

export function createTextNode(vdom, parentEl) {
  const { value = "" } = vdom;
  const textNode = document.createTextNode(value);
  parentEl.append(textNode);
}

export function createElementNode(vdom, parentEl) {
  const { tag, props, children = [] } = vdom;

  const elementNode = document.createElement(tag);
  setProps(elementNode, props);

  children.forEach((child) => {
    mount(child, elementNode);
  });
  parentEl.append(elementNode);
}

export function createFragmentNode(vdom, parentEl) {
  const { children = [] } = vdom;
  children.forEach((child) => {
    mount(child, parentEl);
  });
}
