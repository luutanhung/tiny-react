import { isEmpty } from "./array";
import { setAttrs, setEventListeners } from '../props';

export function isEventKey(prop) {
  return /^on[A-Z]/.test(prop); // onClick, onInput, onKeydown...
}

export function setClasses(el, className = "") {
  const classes = normalizeClass(className);
  el.classList.add(...classes);
}

export function setStyles(el, style = {}) {
  if (isEmpty(style)) return;
  for (const [property, val] of Object.entries(style)) {
    el.style[property] = val;
  }
}

export function setDataAttrs(el, dataAttrs = {}) {
  if (isEmpty(dataAttrs)) return;
  for (const [property, val] of Object.entries(dataAttrs)) {
    el.dataset[property] = val;
  }
}

export function splitProps(props = {}) {
  const res = {
    class: [],
    style: {},
    attrs: {},
    events: {},
  };

  for (const key in props) {
    const val = props[key];
    if (key === "class") {
      res.class = val;
    } else if (key === "style") {
      res.style = style;
    } else if (isEventKey(key)) {
      const eventName = key.slice(2).toLowerCase();
      res.events[eventName] = val;
    } else {
      res.attrs[key] = val;
    }
  }

  return res;
}

export function setProps(el, props = {}) {
  if (isEmpty(props)) return;

  const { class: className, style, data, attrs, events } = splitProps(props);
  setClasses(el, className);
  setStyles(el, style);
  setDataAttrs(el, data);
  setAttrs(el, attrs);
  setEventListeners(el, events);
}

function normalizeClass(className) {
  if (typeof className === "string") {
    return className.split(" ");
  }

  if (Array.isArray(className)) {
    return className.map(normalizeClass).filter(Boolean);
  }

  if (typeof className === "object") {
    return Object.keys(className).filter((key) => className[key]);
  }

  return [];
}
