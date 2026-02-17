import { VNodeType } from '../vnode';

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

export function patch(oldVNode, newVNode, parentEl) {
  
}