import { isNil, tagIsComponentTag } from '../helpers';
import { setProps } from "../helpers/attribute";
import { ComponentRegistry } from '../component';
import { parseJSX } from '../jsx-parser';
import { VNodeType } from "../vnode";
import { insertAtIdx } from './manipulation';

export function mount(vdom, parentEl, idx) {
  const { type: typeOfVDom, tag } = vdom;

  if (typeOfVDom === VNodeType.TEXT) {
    createTextNode(vdom, parentEl, idx);
  } else if (typeOfVDom === VNodeType.ELEMENT) {
    if (tagIsComponentTag(tag)) {
     createComponentNode(vdom, parentEl, idx);
    } else {
      createElementNode(vdom, parentEl, idx);
    }
  } else if (typeOfVDom === VNodeType.FRAGMENT) {
    createFragmentNode(vdom, parentEl, idx);
  } else {
    throw new TypeError("mount: type of VDom must be VNodeType.");
  }
}

export function createTextNode(vdom, parentEl, idx) {
  const { value = "" } = vdom;
  const textNode = document.createTextNode(value);
  vdom.el = textNode;
  vdom.parentEl = parentEl;
  insertAtIdx(vdom.el, parentEl, idx);
}

export function createElementNode(vdom, parentEl, idx) {
  const { tag, props, children = [] } = vdom;

  const elementNode = document.createElement(tag);
  vdom.el = elementNode;
  vdom.parentEl = parentEl;

  setProps(vdom.el, props);

  children.forEach((child) => {
    mount(child, vdom.el);
  });

  insertAtIdx(vdom.el, parentEl, idx);
}

export function createFragmentNode(vdom, parentEl, idx) {
  const { children = [] } = vdom;
  vdom.el = parentEl;

  children.forEach((child, i) => {
    mount(child, vdom.el, idx ? idx + i : null);
  });
}

export function createComponentNode(vdom, parentEl) {
  const { tag } = vdom;
  const Component = ComponentRegistry.get(tag);
  const ast = parseJSX(Component());
  mount(ast, parentEl);
}
