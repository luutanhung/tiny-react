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

---

## 📄 License

This project is licensed under the [GPL](./LICENSE.txt) License.
