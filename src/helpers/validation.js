export function isComponent(vdomTag) {
  return typeof vdomTag === "function" && /^[A-Z]/.test(vdomTag.name);
}

export function tagIsComponentTag(tag) {
  return /^[A-Z]/.test(tag);
}