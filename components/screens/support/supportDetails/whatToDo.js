import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import styled from "styled-components";

const WhatToDo = () => (
  <div>
    <Card>
      <Card.Header>
        <Accordion.Toggle
          style={styles}
          as={Button}
          variant="link"
          eventKey="2"
        >
          What do I need to use BetterLifesavings?
        </Accordion.Toggle>
      </Card.Header>
      <AccordionCollapse eventKey="2">
        <Card.Body>
          To use BetterLifesavings and sign up for any of our savings plan, you
          must be a citizen of a particular country and own a mobile phone and a
          phone number installed.
        </Card.Body>
      </AccordionCollapse>
    </Card>
  </div>
);

export default WhatToDo;

const styles = {
  display: "block",
  fontWeight: "bold",
  fontSize: "120%",
  textDecoration: "none",
};
const AccordionCollapse = styled(Accordion.Collapse)`
  background-color: #1aa3ff;
  color: #fff;
`;
