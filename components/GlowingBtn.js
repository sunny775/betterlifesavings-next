import styled, {keyframes} from 'styled-components'

const animate = keyframes`
0% {
    background-position: 0%;
  }
  100% {
    background-position: 400%;
  }
`;
export const A = styled.a`
position: relative;
  display: block;
  left: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
  margin: 60px 0px;
  width: fit-content;
  
  display: block;
  text-align: center;
  padding: 10px 20px;
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
  background: linear-gradient(90deg, #03a9f4, #37b5e3, #0d47a1, #03a9f4);
  background-size: 400%;
  border-radius: 30px;
  font-weight: bold;
  text-shadow: none;
  animation: ${animate} 8s linear infinite;
  &:before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    z-index: -1;
    background: linear-gradient(90deg, #03a9f4, #76ff03, #0d47a1, #03a9f4);
    background-size: 400%;
    border-radius: 40px;
    transition: 0.5s;
    font-weight: bold;
    animation: ${animate} 8s linear infinite;
    filter: blur(1px);
  }
`