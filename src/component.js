import { componentHooks, setCurrentCommponent, setHookIdx } from './hooks';
import { parseJSX } from './jsx-parser';
import { mount, patch } from "./dom";

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

    instance.__rerender = function() {
      const oldVDom = this.vdom;

      // Set this component as current and reset hook idx before rendering.
      setCurrentCommponent(this);
      setHookIdx(0);

      const newVDom = fn(props);
      this.vdom = newVDom;
      patch(oldVDom, newVDom);

      setCurrentCommponent(null);
    }

    setCurrentCommponent(null);

    return vdom;
  }

  ComponentRegistry.set(fn.name, wrappedComponents);
  return wrappedComponents;
}