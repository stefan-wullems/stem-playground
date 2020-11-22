export function intersection<T> (a: T[], b: T[]) {
  const setB = new Set(b)
  return [...new Set(a)].filter(x => setB.has(x))
}
