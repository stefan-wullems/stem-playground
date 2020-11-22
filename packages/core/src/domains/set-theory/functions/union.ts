export function union (...arrs: string[][]) {
  return Array.from(new Set(arrs.reduce((all, elems) => [...all, ...elems], [])))
}
