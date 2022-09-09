import styled from "styled-components";

interface Props {
  size?: string
  marginBottom?: string
}

export const IconWrapper = styled.i<Props>`
  font-size: ${props => !props.size ? '12px' : `${props.size}px`};
  margin-bottom: ${props => !props.size ? '' : `${props.marginBottom}px`}
`