import { VNodeType } from "./vnode";

export function mount(vdom, parentEl) {
  const { type: typeOfVDom } = vdom;

  if (typeOfVDom === VNodeType.TEXT) {
    createTextNode(vdom, parentEl);
  } else if (typeOfVDom === VNodeType.ELEMENT) {
  } else if (typeOfVDom === VNodeType.FRAGMENT) {
  }
}

export function createTextNode(vdom, parentEl) {
  const { children = "" } = vdom;
  const textNode = document.createTextNode(children);
  parentEl.append(textNode);
}
