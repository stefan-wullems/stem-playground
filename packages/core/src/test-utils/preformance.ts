export function performanceTest (name: string, fn: (index: number) => void, amount = 1) {
  let startTime = 0
  const results: number[] = []

  for (let index = 0; index < amount; index++) {
    startTime = new Date().getTime()
    fn(index)
    results.push(new Date().getTime() - startTime)
  }

  console.group(name)

  console.table(results.map(result => ({ result: result + 'ms' })))
  console.log(`average: ${results.reduce((a, b) => a + b) / results.length}ms`)
  console.groupEnd()
}
