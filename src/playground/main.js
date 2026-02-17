import { mount, defineComponent } from "../index";

defineComponent(function PasswordGeneratorTitle() {
  return `<h2 className="text-xl font-bold mb-4">Password Generator</h2>`;
});

const PasswordGeneratorForm = defineComponent(function PasswordGenerator() {
  return `
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="container p-4 bg-gray-50 border rounded-lg w-[40%]">
        <PasswordGeneratorTitle />
  
        <form id="gen-form" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="password-length" className="block text-sm font-medium">
              Password length
            </label>
            <input
              id="password-length"
              type="range"
              min="8"
              max="32"
              step="1"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
  
          <button
            type="button"
            className="mt-6 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
            onClick={() => console.log("generate password")}
          >
            <span>Generate</span>
            <i className="icon-refresh ml-2" />
          </button>
        </form>
      </div>
    </div>
  `;
});

mount(PasswordGeneratorForm(), document.getElementById("app"));
