import styled, { keyframes } from "styled-components";

const colorFade = keyframes`
  0% {
    color: white;
    background-color: #1b7592;
  }
  100% {
    background-color: transparent;
    color: #97c1ce;
  }
`

export const EmptyWrapper = styled.div`
  background-color: #1b7592;
  width: fit-content;
  padding: 0 4px;
  color: white;
  animation: ${colorFade} 1000ms forwards;
`