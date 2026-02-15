# Tiny React

A small minor version of React for educational purposes.

---

## 🚀 Features
- Virtual DOM creation.
- Rendering system.

---

## 🧪 Public API

Tiny React exposes a minimal set of functions so you can experiment with how virtual DOM works.

---
### ✅ `h()` — Create Virtual Node
```
import { h } from "@luutanhung/tiny-react";

const vnode = h("div", { class: "box" }, [
  h("span", ["Tiny React"]),
]);
```

## 📄 License

This project is licensed under the [GPL](./LICENSE.txt) License.
