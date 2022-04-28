import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Enzyme from 'enzyme'

import 'jest-location-mock'
import '@testing-library/jest-dom'
import 'jest-styled-components'

Enzyme.configure({ adapter: new Adapter() })
