import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';


const IsRegistered = () => (
    <div>

    <Card>
    <Card.Header>
      <Accordion.Toggle style={styles} as={Button} variant="link" eventKey="0">
      Is BetterLifesavings a registered bank?
      </Accordion.Toggle>
    </Card.Header>
    <AccordionCollapse eventKey="0">
      <Card.Body>Yes, we are licensed by the Central Bank of Nigeria. Our registration number is * ***</Card.Body>
    </AccordionCollapse>
    </Card>
    </div>
);
export default IsRegistered;

const styles = {
  display: 'block',
  fontWeight: 'bold',
  fontSize: '120%',
  textDecoration: 'none'
}
const AccordionCollapse = styled(Accordion.Collapse)`
  background-color:  #1aa3ff;
  color: #fff;
`;
