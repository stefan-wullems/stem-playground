import BooleanExpression from 'boolean-expressions'

interface BooleanExpressionCache {
  [expression: string]: {
    expression: BooleanExpression;
  };
}

const cache: BooleanExpressionCache = {}

function getCache (expression: string) {
  cache[expression] = cache[expression] || {
    expression: new BooleanExpression(expression)
  }

  return cache[expression]
}

export function getVariables (expression: string) {
  return getCache(expression).expression.getVariableNames()
}

export function evaluateExpression (expression: string, variables: string[]) {
  return getCache(expression).expression.evaluate(variables)
}
