export function filterNil(arr = []) {
  if (!Array.isArray(arr)) {
    throw new TypeError("filterNil: expected an array.");
  }
  return arr.filter((item) => item != null);
}
