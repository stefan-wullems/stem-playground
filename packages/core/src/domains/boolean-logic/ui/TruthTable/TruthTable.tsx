import React, { useMemo } from 'react'
import styled from 'styled-components'

import { createTruthTable } from '../../functions/truth-table'

const StyledTruthTable = styled.table`
  border-radius: 5px;
  font-size: 12px;
  font-weight: normal;
  border: none;
  border-collapse: collapse;
  width: 100%;
  max-width: 100%;
  white-space: nowrap;
  background-color: white;

  td,
  th {
    text-align: center;
    padding: 8px;
  }

  td {
    border-right: 1px solid #f8f8f8;
    font-size: 12px;
  }

  thead th {
    color: #ffffff;
    background: #324960;
  }

  .true {
    background-color: green;
  }

  .false {
    background-color: #bb2124;
  }

`

interface TruthTableProps {
  expressions: string[];
}

export function TruthTable ({ expressions }: TruthTableProps) {
  const truthTable = useMemo(() => createTruthTable(expressions), [expressions])

  return (
    <StyledTruthTable>
      <thead>
        <tr>
          {!!truthTable.meta.variables.length && (
            <th colSpan={truthTable.meta.variables.length}>Variables</th>
          )}
          {!!truthTable.meta.expressions.length && (
            <th colSpan={truthTable.meta.expressions.length}>Propositions</th>
          )}
        </tr>
        <tr>
          {[...truthTable.meta.variables, ...truthTable.meta.expressions].map((expression, i) => (
            <th key={i}>{expression}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {truthTable.rows.map((row, rowIndex) => {
          return (
            <tr key={rowIndex}>
              {[...row.variables, ...row.expressions].map((value, i) => {
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
    </StyledTruthTable>
  )
}
