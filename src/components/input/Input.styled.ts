import styled, { keyframes } from "styled-components";

interface IInputErrorMessage {
  opacity: number
}
export const InputErrorMessage = styled.div<IInputErrorMessage>`
  opacity: ${props => props.opacity};
  transition: opacity 500ms;
`