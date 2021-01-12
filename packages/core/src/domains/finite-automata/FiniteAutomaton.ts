
export class FiniteAutomaton<T> {
  states
  alphabet
  _delta
  initialState
  acceptingStates

  constructor (
    states: Set<T>,
    alphabet: Set<string>,
    delta: (state: T, char: string) => Set<T> | undefined,
    initialState: T,
    acceptingStates: Set<T>
  ) {
    this.states = states
    this.alphabet = alphabet
    this._delta = delta
    this.initialState = initialState
    this.acceptingStates = acceptingStates
  }

  delta (state: T, char: string) {
    return this._delta(state, char) || new Set()
  }
}
