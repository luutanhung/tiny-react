import { h, mount } from "../../dist/tiny-react";
const PasswordGeneratorForm = h("div", [
  h("form", [
    h("label", { for: "password-length" }, ["password length"]),
    h("input", {
      id: "password-length",
      name: "password-length",
    }),
  ]),
  h(
    "button",
    {
      type: "button",
      class: "btn btn-primary",
      onClick: () => {
        console.log("clicked.");
      },
    },
    ["submit"],
  ),
]);
mount(PasswordGeneratorForm, document.getElementById("app"));
