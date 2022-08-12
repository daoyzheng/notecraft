import styled, { css, keyframes } from "styled-components";

interface Props {
  isShakeTitle: boolean
}
const shake = keyframes`
  0% {
    transform: translateX(2px);
  }
  25% {
    transform: translateX(-2px);
  }
  50% {
    transform: translateX(2px);
  }
  75% {
    transform: translateX(-2px);
  }
  100% {
    transform: translateX(0);
  }
`
export const TitleInputWrapper = styled.div<Props>`
  animation: ${props => props.isShakeTitle && css`${shake} 400ms forwards`};
`