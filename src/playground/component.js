import { createComponent } from '../component';
import { useState } from '../hooks';
import { h } from '../vnode';

export const Counter = createComponent(function Counter(props) {
  const [count, setCount] = useState(9);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  const vdom = h("div", { class: "h-screen w-screen flex justify-center items-center"}, [
    h("div", { class: "w-[350px]" }, [
      h("div", { class: "text-lg text-center" }, [`${count}`]), 
      h("div", { class: "flex flex-row justify-between items-center"}, [
          h("button", { type: "button", class: "cursor-pointer", onClick: () => increment() }, ["increment"]),
          h("button", { type: "button", class: "cursor-pointer", onClick: () => decrement() }, ["decrement"]),
        ] )
    ]),
  ]);
  
  return vdom;
});