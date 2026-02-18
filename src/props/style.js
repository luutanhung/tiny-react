export function setStyle(el, property, val) {
  if (el && property) {
    el.style[property] = val;
  }
}

export function removeStyle(el, property) {
  if (el && property) {
    el.style[property] = "";
  }
}