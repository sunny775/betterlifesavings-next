import React from "react";
import Footer from "./footer/Footer";
import { NavBar } from "./NavBar";
import styled from "styled-components";

const Div = styled.div`
  text-align: center;
`;

export const Layout = ({ children, ...rest }) => (
  <div>
    <NavBar />
    <Div>{children}</Div>
    <Footer />
  </div>
);
