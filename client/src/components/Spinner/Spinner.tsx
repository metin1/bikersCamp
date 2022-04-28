import React from 'react'
import styled from 'styled-components'

import { SpinnerInterface } from './Spinner.types'

export const StyledSpinner = styled.svg`
  animation: rotate 1s linear infinite;
  width: 50px;
  height: 30px;

  & .path {
    stroke: ${({ color }) => color}; // color props
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`

const Spinner = (props: SpinnerInterface) => (
	<StyledSpinner viewBox='0 0 50 50' color={props.color}>
		<circle
			className='path'
			cx='25'
			cy='25'
			r='20'
			fill='none'
			strokeWidth='4'
		/>
	</StyledSpinner>
)

Spinner.defaultProps = {
	color: 'darkGrey',
}

export default Spinner
