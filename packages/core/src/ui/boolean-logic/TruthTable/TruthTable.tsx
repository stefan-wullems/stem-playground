import React, { useMemo } from 'react'
import styled from 'styled-components'

import { createTruthTable } from '../../../domains/boolean-logic/truth-table'
import { isValidDeductiveArgument } from '../../../domains/boolean-logic/deduction'

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

interface ExpressionGroup {
  group: string;
  expressions: string[];
  renderHeader?: (expression: string) => React.ReactNode;
}

function isExpressionGroup (arg: string | ExpressionGroup): arg is ExpressionGroup {
  return typeof arg !== 'string'
}

interface TruthTableProps {
  expressions: string[] | ExpressionGroup[];
}

export function TruthTable ({ expressions }: TruthTableProps) {
  const groups = useMemo(() => (
    isExpressionGroup(expressions[0])
      ? expressions
      : [{ group: 'Expressions', expressions }]
  ) as ExpressionGroup[]
  , [expressions])

  const truthTable = useMemo(() => (
    createTruthTable(groups.map(group => group.expressions).flat())
  ), [expressions])

  return (
    <StyledTruthTable>
      <thead>
        <tr>
          {!!truthTable.meta.variables.length && (
            <th colSpan={truthTable.meta.variables.length}>Variables</th>
          )}
          {groups.map(group => (
            <th key={group.group} colSpan={group.expressions.length}>{group.group}</th>
          ))}
        </tr>
        <tr>
          {[...truthTable.meta.variables].map((expression, i) => (
            <th key={i}>{expression}</th>
          ))}
          {groups.map((group, i) => group.expressions.map((expression, j) => (
            <th key={i + '-' + j}>{group.renderHeader?.(expression) || expression}</th>
          )))}
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

interface DeductiveArgumentTruthTableProps {
  propositions: string[];
  conclusions: string[];
}

const StyledConclusionHeader = styled.div`
  .valid {
    color: green;
  }

  .invalid {
    color: #bb2124;
  }
`

function renderConclusionHeader (propositions: string[], conclusion: string) {
  return (
    <StyledConclusionHeader>
      {conclusion}
      {isValidDeductiveArgument(propositions, conclusion) ? (
        <span className='valid'>Valid &#10003;</span>
      ) : (
        <span className='invalid'>Invalid &#10005;</span>
      )}
    </StyledConclusionHeader>
  )
}

function DeductiveArgumentTruthTable ({
  propositions,
  conclusions
}: DeductiveArgumentTruthTableProps) {
  const expressions = useMemo(() => [{
    group: 'Propositions',
    expressions: propositions
  }, {
    group: 'Conclusions',
    expressions: conclusions,
    renderHeader: (conclusion: string) => renderConclusionHeader(propositions, conclusion)
  }], [propositions, conclusions])

  return (
    <TruthTable expressions={expressions} />
  )
}

TruthTable.DeductiveArgument = DeductiveArgumentTruthTable
