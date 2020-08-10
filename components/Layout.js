import React from "react";
import Footer from "./footer/Footer";
import { NavBar } from "./NavBar";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  padding: 0;
  margin:0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;


export const Layout = ({ children, ...rest }) => (
  <div>
    <NavBar />
    <Container>{children}</Container>
    <Footer />
  </div>
);
