import { performanceTest } from '../../test-utils/preformance'

import { getVariables } from './boolean-expression'

describe('boolean-expression#getVariables', () => {
  it('returns an array with all variables', () => {
    expect(getVariables('(A|B)&!C')).toEqual(expect.arrayContaining(['A', 'B', 'C']))
  })

  it('performance', () => {
    performanceTest('getVariables: same expression', () => {
      getVariables('(A|B)&!D')
    }, 3)

    const expressions = ['(B|A)|!C', '(B&A)|C', '!(B&A)&C']
    performanceTest('getVariables: different expressions', (index) => {
      getVariables(expressions[index])
    }, 3)
  })
})
