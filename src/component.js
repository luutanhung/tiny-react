import { setCurrentCommponent, setHookIdx } from './hooks';
import { parseJSX } from './jsx-parser';
import { mount } from './mount';

export const ComponentRegistry = new Map();

export function registerComponent(component) {
  ComponentRegistry.set(component.name, component);
}

export function createComponent(fn) {
  const wrappedComponents = (props = {}) => {
    const instance = {
      fn,
      props,
      parentEl: null,
      vdom: null,
    };

    setCurrentCommponent(instance);
    setHookIdx(0);

    let vdom = fn(props);
    if (typeof vdom === "string") {
      vdom = parseJSX(vdom);
    }

    instance.vdom = vdom;

    setCurrentCommponent(null);

    instance.__rerender = function() {
      const oldVDom = this.vdom;
      const newVdom = fn(props);
    }

    return vdom;
  }

  ComponentRegistry.set(fn.name, wrappedComponents);
  return wrappedComponents;
}