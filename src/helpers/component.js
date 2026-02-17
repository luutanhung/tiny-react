import { parseJSX } from '../jsx-parser';

export function isComponent(vdomTag) {
  return typeof vdomTag === "function" && /^[A-Z]/.test(vdomTag.name);
}

export function tagIsComponentTag(tag) {
  return /^[A-Z]/.test(tag);
}

export const ComponentRegistry = new Map();

export function registerComponent(component) {
  ComponentRegistry.set(component.name, component);
}

export function defineComponent(fn) {
  const wrappedComponents = (props = {}) => {
    const result = fn(props);
    return parseJSX(result);
  }
  ComponentRegistry.set(fn.name, fn);
  return wrappedComponents;
}