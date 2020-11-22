
import React from 'react'
import { array, withKnobs } from '@storybook/addon-knobs'

import { TruthTable } from './TruthTable'

export default {
  title: 'Truth Table',
  decorators: [withKnobs]
}

export const Default = () => {
  const expressions = array('Expressions', ['(A|B)&!C', 'C&(!B)', 'B', 'A|B|G'], ',')

  // Serously, fuck this.
  const fuckingCorrectExpressions = expressions
    .map((expression) => expression.replace('&amp;', '&'))

  return <TruthTable expressions={fuckingCorrectExpressions} />
}
