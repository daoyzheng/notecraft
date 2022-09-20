import styled from "styled-components";

interface LineProps {
  height?: number
  top?: number
  width: number
}

export const Line = styled.div<LineProps>`
  width: ${props => `${props.width}px`};
  height: ${props => props.height ? `${props.height}px` : ''};
  top: ${props => props.top ? `${props.top}px` : ''};
`