import React, { useMemo } from 'react'

import { createTruthTable } from '../functions/truth-table'

interface TruthTableProps {
  expressions: string[]
}

export function TruthTable ({ expressions }: TruthTableProps) {
  const truthTable = useMemo(() => createTruthTable(expressions), [expressions])

  return (
    <table>
      <thead>
        <tr>
          {!!truthTable.meta.variables.length && (
            <th colSpan={truthTable.meta.expressions.length}>Variables</th>
          )}
          {!!truthTable.meta.expressions.length && (
            <th colSpan={truthTable.meta.expressions.length}>Propositions</th>
          )}
        </tr>
        <tr>
          {[truthTable.meta.variables, truthTable.meta.expressions].flatMap((expression, i) => (
            <th key={i}>{expression}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {truthTable.rows.map((row, rowIndex) => {
          return (
            <tr key={rowIndex}>
              {[row.variables, row.expressions].flatMap((value, i) => {
                return (
                  <td key={i} className={value ? 'true' : 'false'}>
                    {value ? 'T' : 'F'}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
