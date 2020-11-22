import React, { useMemo } from 'react'

import { times } from '../../utils/times'

import { createDeductiveArgumentTruthTable } from './truth-table/createTruthTable'

interface DeductiveArgumentTruthTableProps {
  propositions: string[];
  conclusions: string[];
}

export function DeductiveArgumentTruthTable ({
  propositions,
  conclusions
}: DeductiveArgumentTruthTableProps) {
  const truthTable = useMemo(() => (
    createDeductiveArgumentTruthTable(propositions, conclusions)
  ), [propositions, conclusions])

  const columns = useMemo(() => {
    return [
      ...truthTable.variables,
      ...truthTable.propositions,
      ...truthTable.conclusions
    ]
  }, [truthTable])

  return (
    <table>
      <thead>
        <tr>
          {!!truthTable.variables.length && (
            <th colSpan={truthTable.variables.length}>Variables</th>
          )}
          {!!truthTable.propositions.length && (
            <th colSpan={truthTable.propositions.length}>Propositions</th>
          )}
          {!!truthTable.conclusions.length && (
            <th colSpan={truthTable.conclusions.length}>Conclusions</th>
          )}
        </tr>
        <tr>
          {columns.map((column, i) => {
            if (column.type === 'conclusion') {
              return (
                <th key={i}>
                  {column.expression}{' '}
                  {column.valid ? (
                    <span className='valid'>Valid &#10003;</span>
                  ) : (
                    <span className='invalid'>Invalid &#10005;</span>
                  )}
                </th>
              )
            }
            return <th key={i}>{column.expression}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {times(truthTable.lineCount, (line) => {
          return (
            <tr key={line}>
              {columns.map((column, i) => {
                return (
                  <td
                    key={i}
                    className={column.lines[line] ? 'true' : 'false'}>
                    {column.lines[line] ? 'T' : 'F'}
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
