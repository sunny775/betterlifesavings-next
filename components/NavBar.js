import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { NavItem } from "./NavItem";
import { MobileView } from "./MobileView";
import useAuth from '../hooks/auth'

const buttons = {
  margin: 10,
};
const Nav = styled.div`
  height: 100px;
  background: #2e7d32;
  padding: 0 1vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.4s;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
`;
const Wallet = styled.div`
  height: 50px;
  width: fit-content;
  float: right !important;
  @media (max-width: 900px) {
    display: none;
  }
`;
const SignIn = styled(Button)`
  color: white;
  border-radius: 15px;
  margin-left: 10px;
`;
const Div = styled.div`
  height: 96px;
  display: flex;
  width: 96px;
  background-colof: red;
  border-radius: 50%;
  background-image: url('/new-logo.png');
  background-position: top;
  background-repeat: no-repeat;
  background-size: contain;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
`;
const A = styled.a`
  text-decoration: none !important;
  color: white;
  :hover {
    opacity: 0.8;
    color: white;
  }
`;
const Brand = styled.div`
  font-family: "Lobster", cursive;
  opacity: 0.8;
  font-size: calc(6px + 2.2vmin);
  padding-right: 20px;
  letter-spacing: 1px;
  small{
    font-size: calc(2px + 1vmin);
    color: #eee;
  }
`;
const Span = styled.span`
  color: white;
  font-size: 30px;
  padding: 20px;
  padding-right: 40px;
  cursor: pointer;
  @media (min-width: 900px) {
    display: none;
  }
`;

export const NavBar = () => {
  const [mobileWidth, setMobileWidth] = useState("0px");
  useEffect(() => {});

  const openMobileNav = () => setMobileWidth("100%");
  const closeMobileNav = () => setMobileWidth("0px");

  const { data, userDetails } = useAuth();
  
  return (
    <Nav id="navbar">
      <Left id="navbar-left">
        <div id="logo" style={{ padding: "5px", float: "left" }}>
          <Link href="/">
            <a><Div></Div></a>
          </Link>
        </div>
        <Brand>
          <Link href="/"><A>BetterLifesavings</A></Link>
          <small style={{display: 'block'}}>...helping you save for a BetterLife</small>
        </Brand>
        <NavItem>
          <Link href="/about"><A>About Us</A></Link>
        </NavItem>
        <NavItem>
          <Link href="/contact"><A>Contact</A></Link>
        </NavItem>
        <NavItem>
          <Link href="/blog"><A>Blog</A></Link>
        </NavItem>
        <NavItem>
          <Link href="/support"><A>Support</A></Link>
        </NavItem>
      </Left>

      <Wallet>
        {userDetails && userDetails.username ? (
          <Link href="/account">
            <a style={buttons}>
            <img src='/wallet.png' height="100%" alt="wallet" />
            <SignIn variant="outline-success" size="sm">
              <strong>{userDetails.username}</strong>
            </SignIn>
            </a>
          </Link>
        ) : data && data.phoneNumber ? (
          <Link href={'/settings/edit-profile'}>
            <a style={buttons}>
            <img src='/wallet.png' height="100%" alt="wallet" />
            <SignIn variant="outline-success" size="sm">
              <strong>{data.phoneNumber}</strong>
            </SignIn>
            </a>
          </Link>
        ) : (
          <Link href="/sign-in">
           <a style={buttons}>
           <img src='/wallet.png' height="100%" alt="wallet" />
            <SignIn variant="outline-success" size="sm">
              sign in
            </SignIn>
           </a>
          </Link>
        )}
      </Wallet>
      <Span onClick={openMobileNav}>&#9776;</Span>
      <MobileView
        width={mobileWidth}
        close={closeMobileNav}
        data={data}
        userDetails={userDetails}
      />
    </Nav>
  );
};
