import { layeredStateDiagram, layeredStateDiagram2 } from './layeredStateDiagram'
import { FiniteAutomaton } from './FiniteAutomaton'

describe('The layeredStateDiagram function', () => {
  it.each([
    // -----------
    [
      (() => {
        const delta = new Map([
          [1, { a: new Set([2]), b: new Set([3]) }],
          [2, { a: new Set([2]), b: new Set([2]) }],
          [3, { a: new Set([3]), b: new Set([3]) }]
        ])

        return new FiniteAutomaton(
          new Set([1, 2, 3]),
          new Set(['a', 'b']),
          (state, char) => delta.get(state)[char],
          1,
          new Set([3])
        )
      })(),
      [[1], [2, 3]]
    ],
    // -----------
    [
      (() => {
        const delta = new Map([
          [1, { a: new Set([2]), b: new Set([3]) }],
          [2, { a: new Set([2]), b: new Set([2]) }],
          [3, { a: new Set([4]), b: new Set([5]) }],
          [4, { a: new Set([4]), b: new Set([4]) }],
          [5, { a: new Set([5]), b: new Set([5]) }]
        ])

        return new FiniteAutomaton(
          new Set([1, 2, 3]),
          new Set(['a', 'b']),
          (state, char) => delta.get(state)[char],
          1,
          new Set([3])
        )
      })(),
      [
        [1],
        [2, 3],
        [4, 5]
      ]
    ]
  ])('bla', (fa, layers) => {
    expect(layeredStateDiagram(fa)).toEqual(layers)
  })
})

describe.skip('The layeredStateDiagram2 function', () => {
  it.each([
    // -----------
    [
      (() => {
        const delta = new Map([
          [1, { a: new Set([2]), b: new Set([3]) }],
          [2, { a: new Set([2]), b: new Set([2]) }],
          [3, { a: new Set([3]), b: new Set([3]) }]
        ])

        return new FiniteAutomaton(
          new Set([1, 2, 3]),
          new Set(['a', 'b']),
          (state, char) => delta.get(state)[char],
          1,
          new Set([3])
        )
      })(),
      {
        state: 1,
        children: [{ state: 2 }, { state: 3 }]
      }
    ],
    // -----------
    [
      (() => {
        const delta = new Map([
          [1, { a: new Set([2]), b: new Set([3]) }],
          [2, { a: new Set([2]), b: new Set([2]) }],
          [3, { a: new Set([4]), b: new Set([5]) }],
          [4, { a: new Set([4]), b: new Set([4]) }],
          [5, { a: new Set([5]), b: new Set([5]) }]
        ])

        return new FiniteAutomaton(
          new Set([1, 2, 3]),
          new Set(['a', 'b']),
          (state, char) => delta.get(state)[char],
          1,
          new Set([3])
        )
      })(),
      {
        state: 1,
        children: [
          { state: 2 },
          {
            state: 3,
            children: [
              { state: 4 },
              { state: 5 }
            ]
          }
        ]
      }
    ]
  ])('bla', (fa, layers) => {
    expect(layeredStateDiagram2(fa)).toEqual(layers)
  })
})
