export function insertAtIdx(el, parentEl, idx) {
  if (idx == null) {
    parentEl.append(el);
    return;
  }

  if (idx < 0) {
    throw new Error(`insertAtIdx: Index must be a positive number, got ${idx}`);
  }

  const childNodes = parentEl.childNodes;
  if (idx >= childNodes.length) {
    parentEl.append(el);
  } else {
    parentEl.insertBefore(el, childNodes[idx]);
  }
}
