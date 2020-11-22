import { times } from '../../../utils/times'
import { intersection } from '../../set-theory/functions/intersection'
import { union } from '../../set-theory/functions/union'
import { evaluateExpression, getVariables } from '../functions/boolean-expression'

type Table = {
  meta: {
    variables: string[];
    expressions: string[];
  };
  rows: {
    variables: boolean[];
    expressions: boolean[];
  }[];
}

// @todo check if can be done with matrix
export function createTruthTable (expressions: string[]): Table {
  console.time('table')

  const variables = union(...expressions.map(getVariables))

  const rowCount = 2 ** variables.length

  const rows = times(rowCount, (row) => {
    const [variableValues, trueVariables] = variables.reduce((acc, variable, index) => {
      const groupSize = rowCount / 2 ** (index + 1)

      const value = row % (groupSize * 2) < groupSize

      acc[0].push(value)

      if (value) {
        acc[1].push(variable)
      }

      return acc
    }, [[], []] as [tableValues: boolean[], trueVariables: string[]])

    return {
      variables: variableValues,
      expressions: expressions.map((expression) => {
        const expressionVariables = getVariables(expression)

        return evaluateExpression(expression, intersection(expressionVariables, trueVariables))
      })
    }
  })

  console.timeEnd('table')

  return {
    meta: { variables, expressions },
    rows
  }
}
