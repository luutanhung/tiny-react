import { Counter } from "./components";

const counter = new Counter();
console.log(counter);
counter.mount(document.getElementById("app"), null);
