import { diffObject } from '../diffing';
import { splitProps } from '../helpers/attribute';
import { removeAttribute, setAttribute } from '../props';
import { VNodeType } from '../vnode';
import { mount } from './mount';
import { unmount } from './unmount';

export function checkTwoNodesAreEqual(firstVNode, secondVNode) {
  if (firstVNode.type !== secondVNode.type) {
    return false;
  }

  if (firstVNode.type === VNodeType.ELEMENT) {
    const { tag: firstTag } = firstVNode;
    const { tag: secondTag } = secondVNode;

    return firstTag === secondTag;
  }

  return true;
}

export function patchClassName(el, oldCls = "", newCls = "") {
  const oldSt = new Set(oldCls.split(/\s+/).filter(Boolean));
  const newSt = new Set(newCls.split(/\s+/).filter(Boolean));

  for (const c of oldSt) {
    if (!newSt.has(c)) {
      el.classList.remove(c);
    }
  }
  
  for (const c of newSt) {
    if (!oldSt.has(c)) {
      el.classList.add(c);
    }
  }
}

function findIndexInParentEl(parentEl, el) {
  const idx = Array.from(parentEl.childNodes).indexOf(el);
  return idx < 0 ? null : idx;
}

export function patch(oldVNode, newVNode, parentEl) {
  if (!checkTwoNodesAreEqual(oldVNode, newVNode)) {
    const idx = findIndexInParentEl(parentEl, oldVNode.el);
    unmount(oldVNode);
    mount(newVNode, parentEl, idx);
    return newVNode;
  }

  newVNode.el = oldVNode.el;
  if (newVNode.type === VNodeType.TEXT) {
    patchText(oldVNode, newVNode);
    return newVNode;
  } else if (newVNode.type === VNodeType.ELEMENT) {
    patchElement(oldVNode, newVNode);
  }

  return newVNode;
}

export function patchText(oldVNode, newVNode) {
  const el = oldVNode.el;
  const { value: oldVal } = oldVNode;
  const { value: newVal } = newVNode;

  if (newVal !== oldVal) {
    el.nodeValue = newVal;
  }
}

export function patchElement(oldVNode, newVNode) {
  const el = oldVNode.el;
  const { class: oldClass, style: oldStyle, attrs: oldAttrs, events: oldEvents } = splitProps(oldVNode.props);
  const { class: newClass, style: newStyle, attrs: newAttrs, events: newEvents } = splitProps(newVNode.props);

  patchAttrs(el, oldAttrs, newAttrs);
}

export function patchAttrs(el, oldAttrs, newAttrs) {
  const { added, removed, updated } = diffObject(oldAttrs, newAttrs);

  for (const attrName of removed) {
    removeAttribute(el, attrName);
  }

  for (const attrName of added.concat(updated)) {
    setAttribute(el, attr, newAttrs[attrName]);
  }
}