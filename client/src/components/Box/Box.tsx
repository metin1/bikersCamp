import styled from 'styled-components'
import {} from 'styled-components/cssprop'

import {
  background,
  border,
  color,
  DesignSystemProps,
  flexbox,
  fontFamily,
  grid,
  layout,
  position,
  shadow,
  space,
  typography,
} from 'src/styles/styled'

export type BoxProps = DesignSystemProps & {
  disabled?: string
  css?: string
  cursor?: string
  onClick?: (e?: any) => void
}

const Box = styled.div<BoxProps>`
  ${layout}
  ${space}
  ${color}
  ${background}
  ${layout}
  ${grid}
  ${border}
  ${flexbox}
  ${typography}
  ${position}
  ${fontFamily}
  ${shadow} {
    cursor: ${props => props.cursor};
    disabled: ${props => props.disabled};
    ${props => props.css};
  }
`

Box.displayName = 'Box'

export default Box
