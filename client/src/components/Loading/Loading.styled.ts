import styled from 'styled-components'

interface LoadingWrapperProps {
  readonly show: boolean
  readonly bg: string
}

export const InternalWrapper = styled.div<LoadingWrapperProps>`
  display: ${props => (props.show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${props =>
		props.bg ? props.bg : 'rgba(216, 255, 255, 0.5)'};
  z-index: 9999;
  cursor: pointer;
`

export const Wrapper = styled(InternalWrapper)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
