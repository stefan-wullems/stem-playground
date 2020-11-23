import { performanceTest } from '../../test-utils/preformance'

import { getVariables, evaluateExpression } from './boolean-expression'

describe('boolean-expression#getVariables', () => {
  it('returns an array with all variables', () => {
    expect(getVariables('(A|B)&!C')).toEqual(expect.arrayContaining(['A', 'B', 'C']))
  })

  it('performance', () => {
    performanceTest('getVariables: same expression', () => {
      getVariables('(A&B)|!C')
    }, 3)

    const expressions = ['(B|A)|!C', '(B&A)|C', '!(B&A)&C']
    performanceTest('getVariables: different expressions', (index) => {
      getVariables(expressions[index])
    }, 3)
  })
})

describe('boolean-expression#evaluateExpression', () => {
  it('evaluates the expressions correctly', () => {
    expect(evaluateExpression('(D|E)&!F', ['D', 'E', 'F'])).toEqual(false)
    expect(evaluateExpression('(D|E)&!F', ['E', 'F'])).toEqual(false)
    expect(evaluateExpression('(D|E)&!F', ['E'])).toEqual(true)
  })

  it('performance', () => {
    performanceTest('evaluateExpression: same expression', () => {
      evaluateExpression('(D&E)|!F', ['D', 'E', 'F'])
    }, 3)

    const expressions = ['(D|E)|!F', '(D&E)|F', '!(D&E)&F']
    performanceTest('evaluateExpression: different expressions', (index) => {
      evaluateExpression(expressions[index], ['D', 'E', 'F'])
    }, 3)
  })
})
