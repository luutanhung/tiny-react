export function isIdentifer(chr) {
  const IDENTIFIER = /[A-Za-z0-9_-]/;
  return IDENTIFIER.test(chr);
}
