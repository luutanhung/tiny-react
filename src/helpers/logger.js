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
