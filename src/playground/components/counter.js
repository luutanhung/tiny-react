import { h } from "../../vnode.js";
import { createComponent } from "../../component/index.js";

export const Counter = createComponent({
  state() {
    return {
      count: 0,
    };
  },
  render() {
    return h(
      "div",
      {
        class:
          "h-screen w-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800",
      },
      [
        h("div", { class: "w-[400px]" }, [
          // Counter Card
          h(
            "div",
            {
              class:
                "bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20",
            },
            [
              // Title
              h(
                "div",
                {
                  class:
                    "text-sm font-medium text-gray-400 mb-2 tracking-wider uppercase text-center",
                },
                ["Current Value"],
              ),

              // Counter Value with enhanced styling
              h(
                "div",
                {
                  class:
                    "text-8xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text",
                },
                [`${this.state.count}`],
              ),

              // Button Container
              h(
                "div",
                { class: "flex flex-row justify-between items-center gap-4" },
                [
                  // Increment Button
                  h(
                    "button",
                    {
                      type: "button",
                      class:
                        "flex-1 cursor-pointer px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900",
                      onClick: () =>
                        this.setState({ count: this.state.count + 1 }),
                    },
                    [
                      h(
                        "span",
                        { class: "flex items-center justify-center gap-2" },
                        [
                          h("span", { class: "text-xl" }, ["+"]),
                          h("span", {}, ["Increment"]),
                        ],
                      ),
                    ],
                  ),

                  // Decrement Button
                  h(
                    "button",
                    {
                      type: "button",
                      class:
                        "flex-1 cursor-pointer px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900",
                      onClick: () =>
                        this.setState({ count: this.state.count - 1 }),
                    },
                    [
                      h(
                        "span",
                        { class: "flex items-center justify-center gap-2" },
                        [
                          h("span", { class: "text-xl" }, ["−"]),
                          h("span", {}, ["Decrement"]),
                        ],
                      ),
                    ],
                  ),
                ],
              ),

              // Optional: Add a reset button
              h("div", { class: "mt-4 text-center" }, [
                h(
                  "button",
                  {
                    type: "button",
                    class:
                      "cursor-pointer text-sm text-gray-400 hover:text-gray-300 transition-colors duration-200 underline underline-offset-2 focus:outline-none focus:text-white",
                    // onClick: reset,
                  },
                  ["Reset to zero"],
                ),
              ]),
            ],
          ),
        ]),
      ],
    );
  },
});
