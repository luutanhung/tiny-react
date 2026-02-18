import { mount, patch, unmount } from "../dom";
import { extractChildVNodes, VNodeType } from "../vnode";

export function createComponent({ render, state }) {
  class Component {
    #vdom = null;
    #hostEl = null;
    #isMounted = false;

    constructor(props) {
      this.props = props;
      this.state = state ? state(props) : {};
    }

    get elements() {
      if (this.#vdom == null) {
        return [];
      }

      if (this.#vdom.type === VNodeType.FRAGMENT) {
        return extractChildVNodes(this.#vdom).map((child) => child.el);
      }

      return [this.#vdom.el];
    }

    get firstElement() {
      return this.elements[0];
    }

    get offset() {
      if (this.#vdom.type === VNodeType.FRAGMENT) {
        return Array.from(this.#hostEl.children).indexOf(this.firstElement);
      }
      return 0;
    }

    setState(state) {
      this.state = { ...this.state, ...state };
      this.#patch();
    }

    updateState(state) {
      this.setState(state);
    }

    render() {
      return render.call(this);
    }

    mount(hostEl, idx = null) {
      if (this.#isMounted) {
        throw new Error("Component is already mounted.");
      }
      this.#vdom = this.render();
      this.#hostEl = hostEl;
      mount(this.#vdom, this.#hostEl, idx);
      this.#isMounted = true;
    }

    unmount() {
      if (!this.#isMounted) {
        throw new Error("Component is not mounted.");
      }
      unmount(this.#vdom);
      this.#vdom = null;
      this.#hostEl = null;
      this.#isMounted = false;
    }

    #patch() {
      if (!this.#isMounted) {
        throw new Error("Component is not mounted.");
      }
      const vdom = this.render();
      this.#vdom = patch(this.#vdom, vdom, this.#hostEl, this);
    }
  }

  return Component;
}
