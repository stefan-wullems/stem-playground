import { FiniteAutomaton } from './FiniteAutomaton'

export function layeredStateDiagram (fa: FiniteAutomaton<unknown>) {
  const layers = []
  let currentLayer = [fa.initialState]
  const encounteredStates = new Set(currentLayer)

  while (currentLayer.length) {
    layers.push(currentLayer)

    const successors = new Set<unknown>()
    for (const state of currentLayer) {
      for (const char of fa.alphabet) {
        fa.delta(state, char).forEach(state => {
          if (!encounteredStates.has(state)) {
            successors.add(state)
            encounteredStates.add(state)
          }
        })
      }
    }

    currentLayer = [...successors]
  }

  return layers
}

export function layeredStateDiagram2 (fa: FiniteAutomaton<unknown>) {
  const layers = []
  let currentLayer = [fa.initialState]
  const encounteredStates = new Set(currentLayer)

  while (currentLayer.length) {
    const successors = new Set<unknown>()
    for (const state of currentLayer) {
      for (const char of fa.alphabet) {
        fa.delta(state, char).forEach(state => {
          if (!encounteredStates.has(state)) {
            successors.add(state)
            encounteredStates.add(state)
          }
        })
      }
    }

    currentLayer = [...successors]
  }

  return layers
}
