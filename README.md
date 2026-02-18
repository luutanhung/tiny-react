<div align="center">

### Tiny React

[![License: GPL](https://img.shields.io/badge/License-GPL-blue.svg)](./LICENSE.txt)
[![npm](https://img.shields.io/npm/v/@luutanhung/tiny-react.svg)](https://www.npmjs.com/package/@luutanhung/tiny-react)

A minimal implementation of React built from scratch, based on React's classic architecture for educational purposes.

This project recreates the core concepts of React's internal workings—including virtual DOM creation, reconciliation, and mounting—using a simplified, easy-to-understand codebase. It's designed to help developers learn how React works under the hood by studying and experimenting with a real, working implementation.

</div>

---

## 🚀 Features

- **Virtual DOM Creation** — Build lightweight JavaScript representations of DOM nodes.
- **Rendering System** — Mount virtual DOM trees to the actual browser DOM.
- **Component Support** — Define and render reusable UI components.
- **Fragment Support** — Render multiple children without extra wrapper nodes.
- **Hooks Foundation** — Basic structure for stateful function components.

---

## 🧪 Public API

Tiny React exposes a minimal set of functions so you can experiment with how virtual DOM works.

---

### ✅ `h()` — Create Virtual Node

Creates a virtual DOM node (vnode) representing an element, component, or text.

```js
import { h } from "@luutanhung/tiny-react";

const vnode = h("div", { class: "box" }, [
  h("span", ["Tiny React"]),
]);
```

### ✅ `mount()` — Render Virtual Node to DOM

Mounts a virtual DOM tree to a real DOM container, creating actual DOM nodes.

```js
import { h, mount } from "@luutanhung/tiny-react";

const vnode = h("div", { class: "box" }, [
  h("span", ["Tiny React"]),
]);

mount(vnode, document.getElementById("root"));
```

### ✅ `createComponent()` — Create Class-Based Component

Creates a reusable class-based component with render logic and optional state management.

```js
import { h, createComponent } from "@luutanhung/tiny-react";

const Counter = createComponent({
  state: () => ({ count: 0 }),
  render() {
    return h("div", null, [
      h("p", [`Count: ${this.state.count}`]),
      h("button", {
        onClick: () => this.setState({ count: this.state.count + 1 }),
      }, ["Increment"]),
    ]);
  },
});

const counter = new Counter({});
counter.mount(document.getElementById("root"));
```

### ✅ `patch()` — Update DOM with Changes

Efficiently updates the real DOM by comparing old and new virtual DOM trees and applying only necessary changes.

```js
import { h, mount, patch } from "@luutanhung/tiny-react";

const oldVNode = h("div", { class: "box" }, [
  h("span", ["Hello"]),
]);

mount(oldVNode, document.getElementById("root"));

const newVNode = h("div", { class: "box updated" }, [
  h("span", ["World"]),
]);

patch(oldVNode, newVNode, document.getElementById("root"));
```

### ✅ `unmount()` — Remove Virtual Node from DOM

Removes a virtual DOM tree and all its children from the real DOM, cleaning up event listeners.

```js
import { h, mount, unmount } from "@luutanhung/tiny-react";

const vnode = h("div", { class: "box" }, [
  h("span", ["Tiny React"]),
]);

mount(vnode, document.getElementById("root"));

// Later, remove it from the DOM
unmount(vnode);
```

---

## 📄 License

This project is licensed under the [GPL](./LICENSE.txt) License.
