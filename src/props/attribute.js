import { isEmpty } from '../helpers';

export function isDataAttrKey(key) {
  return key.startsWith("data-");
}

export function setAttrs(el, attrs = {}) {
  if (isEmpty(attrs)) return;

  for (const [attrName, val] of Object.entries(attrs)) {
    setAttribute(el, attrName, val);
  }
}

export function removeAttribute(el, attrName) {
  el[attrName] = null;
  el.removeAttribute(attrName);
}

export function setAttribute(el, attrName, attrVal) {
  if (isDataAttrKey(attrName)) {
    el.setAttribute(attrName, attrVal);
  } else {
    el[attrName] = attrVal;
  }
}