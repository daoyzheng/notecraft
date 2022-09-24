import styled, { css, keyframes } from "styled-components";

const slide = keyframes`
  100% {
    transform: translateX(2px);
  }
`

const bounce = keyframes`
  100% {
    transform: translateY(-2px);
  }

`

export const GlobalMenuItemIconWrapper = styled.i`
  animation: ${bounce} 800ms infinite;
`

export const NotebookListContainer = styled.div`
  height: 400px;
  overflow-y: auto;
`