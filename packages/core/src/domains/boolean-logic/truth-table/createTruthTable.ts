import { times } from '../../../utils/times'
import { union } from '../../set-theory/functions/union'
import { evaluateExpression, getVariables } from '../functions/boolean-expression'

type Variable = {
  type: 'variable';
  expression: string;
  lines: boolean[];
};

type Proposition = {
  type: 'proposition';
  expression: string;
  lines: boolean[];
};

type Conclusion = {
  type: 'conclusion';
  expression: string;
  lines: boolean[];
  valid: boolean;
};

type Table = {
  variables: Variable[];
  propositions: Proposition[];
  conclusions: Conclusion[];
  lineCount: number;
};

export function createDeductiveArgumentTruthTable (
  propositions: string[],
  conclusions: string[]
): Table {
  console.time('table')

  const variables = union(
    ...[...propositions, ...conclusions].map(getVariables)
  )

  const lineCount = 2 ** variables.length

  const _variables = variables.map((variable, index) => ({
    type: 'variable',
    expression: variable,
    lines: times(lineCount, (line) => {
      const groupSize = lineCount / 2 ** (index + 1)

      return line % (groupSize * 2) < groupSize
    })
  } as Variable))

  function evaluateLines (expression: string) {
    return times(lineCount, (line) => {
      return evaluateExpression(
        expression,
        _variables.filter((v) => v.lines[line]).map((v) => v.expression)
      )
    })
  }

  const _propositions = propositions.map((proposition) => {
    return {
      type: 'proposition',
      expression: proposition,
      lines: evaluateLines(proposition)
    } as Proposition
  })

  const _conclusions = conclusions.map((conclusion) => {
    const lines = evaluateLines(conclusion)

    return {
      type: 'conclusion',
      expression: conclusion,
      lines,
      valid: !lines.some((line, i) => {
        return (
          _propositions.every((proposition) => proposition.lines[i])
          && !line
        )
      })
    } as Conclusion
  })

  console.timeEnd('table')

  return {
    variables: _variables,
    propositions: _propositions,
    conclusions: _conclusions,
    lineCount
  }
}
