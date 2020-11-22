import React from 'react'

import { TruthTable } from './TruthTable'

export default {
  title: 'Truth Table'
}

export const Default = () => (
  <TruthTable expressions={['(A|B)&!C', 'C&(!B)', 'B', 'A|B|G']} />
)

export const DeductiveArgument = () => (
  <TruthTable.DeductiveArgument
    propositions={['(J|B)&(!B|!S)', '!J']}
    conclusions={['!S', 'B']} />
)
