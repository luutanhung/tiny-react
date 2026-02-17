import { removeEventListeners } from '../helpers/attribute';
import { VNodeType } from '../vnode';

export function unmount(vdom) {
  const { type } = vdom;

  if (type === VNodeType.TEXT) {
    removeTextNode(vdom);
  } else if (type === VNodeType.ELEMENT) {
    removeElementNode(vdom);
  } else if (type === VNodeType.FRAGMENT) {
    removeFragmentNode(vdom);
  } else {
    throw new Error(`unmount: Cannot destroy Dom of type ${type}`);
  }
}

export function removeTextNode(vnode) {
  const { el } = vnode;
  el.remove();
}

export function removeElementNode(vnode) {
  const { el, children, listeners } = vnode;

  el.remove();
  if (Array.isArray(children)) {
    children.forEach((child) => removeElementNode(child));
  }

  if (listeners) {
    removeEventListeners(listeners, el);
    delete vnode.listeners;
  }
}

function removeFragmentNode(vnode) {
  const { children } = vnode;
  children.forEach((child) => unmount(child));
}