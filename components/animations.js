import { keyframes } from "styled-components";

export const fadeIn = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`;

export const fadeInWithDelay = keyframes`
0% {
  opacity: 0;
}
50% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`;

export const unfold = keyframes`
0% {
  transform: scaleX(0);
}

100% {
  transform: scaleX(1)
}
`