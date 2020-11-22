import 'jest-styled-components'
import 'jest-specific-snapshot'
import '@testing-library/jest-dom/extend-expect'
import faker from 'faker'

// @todo Should we keep this
import enableHooks from 'jest-react-hooks-shallow'

enableHooks(jest)

// Set faker seed
faker.seed(1)
