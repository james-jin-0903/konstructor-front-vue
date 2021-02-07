export function isArraysEquals(a, b) {
  if (!a || !b) {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0, l = a.length; i < l; i++) {
    if (a[i] instanceof Array && b[i] instanceof Array) {
      if (!isArraysEquals(a[i], b[i])) {
        return false;
      }
    } else if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
