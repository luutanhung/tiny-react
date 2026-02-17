export function isComponent(tag) {
  return typeof tag === "function" && /^[A-Z]/.test(tag);
}
