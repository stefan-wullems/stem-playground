export function times<T> (to: number, callback: (index: number) => T) {
  return new Array(to).fill(null).map((_, i) => callback(i))
}
