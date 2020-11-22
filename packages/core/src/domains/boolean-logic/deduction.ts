import { createTruthTable } from './truth-table'

export function isValidDeductiveArgument (propositions: string[], conclusion: string) {
  const truthTable = createTruthTable([conclusion, ...propositions])

  return !truthTable.rows.some((row) => {
    const [conclusion, ...propositions] = row.expressions

    if (!conclusion) {
      return propositions.every((v) => v)
    }
    return false
  })
}
