import { format } from "pretty-format";
import { plugins } from "pretty-format";
const { DOMElement, DOMCollection } = plugins;

/**
 * Beautifully logs JSDOM elements to the terminal
 * @param {HTMLElement|Document} node - The DOM node to log
 * @param {string} label - Optional label for the console
 */
export function logDOM(node, label = "DOM Output") {
  // Check if node exists to avoid crashing
  if (!node) {
    console.log(`\x1b[31m[${label}] Node is null or undefined\x1b[0m`);
    return;
  }

  const output = format(node, {
    plugins: [DOMElement, DOMCollection],
    highlight: true, // Adds ANSI colors
    indent: 2,
  });

  console.log(`\x1b[36m--- ${label} ---\x1b[0m`); // Cyan label
  console.log(output);
  console.log(`\x1b[36m${"-".repeat(label.length + 8)}\x1b[0m\n`);
}

export function log(obj) {
  const colors = {
    key: "\x1b[36m", // cyan
    string: "\x1b[32m", // green
    number: "\x1b[33m", // yellow
    boolean: "\x1b[35m", // magenta
    null: "\x1b[31m", // red
    reset: "\x1b[0m", // reset
  };

  const colorize = (key, value, indent) => {
    if (value === null) return colors.null + "null" + colors.reset;
    if (typeof value === "string")
      return colors.string + '"' + value + '"' + colors.reset;
    if (typeof value === "number") return colors.number + value + colors.reset;
    if (typeof value === "boolean")
      return colors.boolean + value + colors.reset;
    if (Array.isArray(value)) {
      const arrayContent = value
        .map((item) => colorize(null, item, indent + 2))
        .join(", ");
      return `[ ${arrayContent} ]`;
    }
    if (typeof value === "object") {
      const entries = Object.entries(value).map(([k, v]) => {
        return (
          " ".repeat(indent + 2) +
          colors.key +
          '"' +
          k +
          '"' +
          colors.reset +
          ": " +
          colorize(k, v, indent + 2)
        );
      });
      return `{\n${entries.join(",\n")}\n${" ".repeat(indent)}}`;
    }
    return value;
  };

  console.log(colorize(null, obj, 0));
}
