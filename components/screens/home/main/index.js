import React from "react";
import styled from "styled-components";
//import bg from "/1.jpg";
import Link from 'next/link'
import { Button, Row, Col, Image } from "react-bootstrap";
//import Img from "/save1.jpg";

const Section = styled.section`
  box-sizing: border-box;
  padding: 10px;
  background-color: #388e3c;
  margin: 0;
`;
const Banner = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  border-radius: 4px;
  background-image: url(/1.jpg);
  background-size: cover;
  background-position: center;
`;
const H = styled.h4`
  padding: 7px;
  margin-top: 50px;
  margin-bottom: 30px;
  font-weight: bold;
  color: white;
  border-radius: 30px;
`;
const Plan = styled(Row)`
margin:80px 0;
padding: 20px 5px;
color: white;
  :hover {
    box-shadow: 0px 6px 6px 0px #bdbdbd;
    opacity: 0.9;
  }
  box-shadow: 0px 1px 0px 0px #bdbdbd;
`;
const BannerDivText = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 6rem 2rem;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  @media screen (max-width:525px) {
    padding: 1rem 0;
  }
`;
const StartNow = styled.a`
text-decoration: none;
color: white;
&:hover{
  color: white;
  text-decoration: none;
}
`

const Main = () => (
  <Section className="col-md-9">
    <Banner>
      <BannerDivText>
        <h2 style={{ fontWeight: "bold" }}>Plan Your Future by Saving Today</h2>
        <h4>
          Do not save what is left after spending
          <br />
          spend what is left <strong>after saving</strong>
        </h4>
        <Button variant="secondary" size="sm">
        <Link href='/sign-in'><StartNow>Start Now</StartNow></Link>
        </Button>
      </BannerDivText>
    </Banner>
    <H className='bg-secondary'>Saving Plans</H>
    <Plan>
      <Col sm={6}>
        <Image src='/save1.jpg' thumbnail />
      </Col>
      <Col sm={6}>
        <h1>Daily Plan</h1>
        <p>This is the plan where you pick a particular and most convenient rate (e.g #100, #200 etc) and you pay daily. You can pay as much as you have, as many times and the sweetest thing is you can make debit anytime you like. Please note that you will be charged according to the rate at which pay on a monthly basis.</p>
        <Button variant="info"> <Link href='/sign-in'><StartNow>Start Now</StartNow></Link></Button>
      </Col>
    </Plan>
    <Plan>
      <Col sm={6} md={{ order: 2 }}>
        <Image src='/save1.jpg' thumbnail />
      </Col>
      <Col sm={6} md={{ order: 1}}>
        <h1>Weekly Plan</h1>
        <p>This is the plan where you pick a particular and most convenient rate just like the daily plan and you pay on a weekly basis. You can make payments as much as you have and as many times. You will only be charged at your point of collection</p>
        <Button variant="info"><Link href='/sign-in'><StartNow>Start Now</StartNow></Link></Button>
      </Col>
    </Plan>
    <Plan>
      <Col sm={6}>
        <Image src='/save1.jpg' thumbnail />
      </Col>
      <Col sm={6}>
        <h1>Monthly Plan</h1>
        <p>This is the plan where you pick a particular and most convenient rate and you pay on a monthly basis. You can make payments as much as you have and as many times. You will only be charged at your point of collection</p>
        <Button variant="info"> <Link href='/sign-in'><StartNow>Start Now</StartNow></Link></Button>
      </Col>
    </Plan>
    <Plan>
      <Col sm={6} md={{ order: 2}}>
        <Image src='/save1.jpg' thumbnail />
      </Col>
      <Col sm={6} md={{ order: 1}}>
        <h1>Express Plan</h1>
        <p>This plan doesn’t require you to pick a rate. Just pay as much as you have and as many times and make debit whenever you like</p>
        <Button variant="info"><Link href='/sign-in'><StartNow>Start Now</StartNow></Link></Button>
      </Col>
    </Plan>
  </Section>
);
export default Main;
