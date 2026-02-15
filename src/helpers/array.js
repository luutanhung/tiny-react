export function isEmpty(obj) {
  if (isNil(obj)) return true;
  if (Array.isArray(obj) && obj.length === 0) {
    return true;
  }
  if (typeof obj === "object" && Object.keys(obj).length === 0) {
    return true;
  }
  return false;
}

export function isNil(obj) {
  return obj == null;
}

export function filterNil(arr = []) {
  if (!Array.isArray(arr)) {
    throw new TypeError("filterNil: expected an array.");
  }
  return arr.filter((item) => item != null);
}
