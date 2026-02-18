import { ArrayDiffOp, diffArrays, diffObjects } from '../diffing';
import { splitProps } from '../helpers/attribute';
import { addEventListener, removeAttribute, removeStyle, setAttribute, setStyle } from '../props';
import { extractChildVNodes, VNodeType } from '../vnode';
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

export function patchClasses(el, oldCls = "", newCls = "") {
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

  patchChildren(oldVNode, newVNode);

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
  const { listeners: oldListeners = {} } = oldVNode;

  patchAttrs(el, oldAttrs, newAttrs);
  patchClasses(el, oldClass, newClass);
  patchStyles(el, oldStyle, newStyle);
  newVNode.listeners = patchEvents(el, oldListeners, oldEvents, newEvents);
}

export function patchAttrs(el, oldAttrs, newAttrs) {
  const { added, removed, updated } = diffObjects(oldAttrs, newAttrs);

  for (const attrName of removed) {
    removeAttribute(el, attrName);
  }

  for (const attrName of added.concat(updated)) {
    setAttribute(el, attr, newAttrs[attrName]);
  }
}

export function patchStyles(el, oldStyle, newStyle) {
  const { added, removed, updated } = diffObjects(oldStyle, newStyle);

  for (const property of removed) {
    removeStyle(el, property);
  }

  for (const property of added.concat(updated)) {
    setStyle(el, property, newStyle[property]);
  }
}

export function patchEvents(el, oldListeners = {}, oldEvents = {}, newEvents = {}) {
  const { added, removed, updated } = diffObjects(oldEvents, newEvents);

  for (const eventName of removed.concat(updated)) {
    el.removeEventListener(eventName, oldListeners[eventName]);
  }

  const listeners = {};
  for (const eventName of added.concat(updated)) {
    const listener = addEventListener(el, eventName, newEvents[eventName]);
    listeners[eventName] = listener;
  }

  return listeners;
}

export function patchChildren(oldVNode, newVNode) {
  const oldChildren = extractChildVNodes(oldVNode);
  const newChildren = extractChildVNodes(newVNode);
  const parentEl = oldVNode.el;

  const diffSeq = diffArrays(oldChildren, newChildren, checkTwoNodesAreEqual);

  for (const operation of diffSeq) {
    const { originalIndex, index, item } = operation;

    if (operation.op === ArrayDiffOp.ADD) {
      mount(item, parentEl, index);
    } else if (operation.op === ArrayDiffOp.REMOVE) {
      unmount(item);
    } else if (operation.op === ArrayDiffOp.MOVE) {
      const oldChild = oldChildren[originalIndex];
      const newChild = newChildren[index];
      const el = oldChild.el;
      const elAtTargetIndex = parentEl.childNodes[index];
      parentEl.insertBefore(el, elAtTargetIndex);
      patch(oldChild, newChild, parentEl);
    } else if (operation.op === ArrayDiffOp.NOOP) {
      patch(oldChildren[originalIndex], newChildren[index], parentEl);
    }
  }
}