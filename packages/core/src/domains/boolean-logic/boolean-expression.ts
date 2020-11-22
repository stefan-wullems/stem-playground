import BooleanExpression from "boolean-expressions";

interface BooleanExpressionCache { 
  [expression: string]: {
    expression: BooleanExpression;
    resultRegex: RegExp | null;
    inResultRegex: RegExp | null;
  } 
}

const cache: BooleanExpressionCache = {}

function getCache(expression: string) {
  cache[expression] ??= { expression: new BooleanExpression(expression), resultRegex: null, inResultRegex: null }

  return cache[expression]
}

export function getVariables(expression: string) {
  return getCache(expression).expression.getVariableNames()
}

export function evaluateExpression(expression: string, variables: string[]) {
  const v = variables.join('')

  const expressionCache = getCache(expression)
  
  console.log(v, expressionCache.inResultRegex?.test(v), expressionCache.inResultRegex?.source)

  if(expressionCache.inResultRegex?.test(v)) {
    return !!expressionCache.resultRegex?.test(v)
  }

  const result = getCache(expression).expression.evaluate(variables)

  const extraRegex = `([${v}]{${v.length}})`
 
  expressionCache.inResultRegex = new RegExp(
    expressionCache.inResultRegex?.source
      ? `${expressionCache.inResultRegex.source}|${extraRegex}`
      : extraRegex
  )

  if(result) {
    expressionCache.resultRegex = new RegExp(
      expressionCache.resultRegex?.source
        ? `${expressionCache.inResultRegex.source  }|${  extraRegex}`
        : extraRegex
    )
  }
  
  return result
}