import React from "react";
import { Modal } from "react-bootstrap";
import Owner from "./owner";
import Form from "./Form";
import styled from "styled-components";

const Header = styled(Modal.Header)`
  background: #2e7d32;
  color: white;
  letter-spacing: 2px;
`;
const DepositModal = ({open, close, userDetails, postTransaction, transLoading}) => {

 
  const handleClose = () => close();

  return (
    <Modal centered show={open} onHide={handleClose}>
      <Header closeButton>
        <p>
          Fill the form below to create a deposit request.
          <br />
          Our agents will contact you on further steps
        </p>
      </Header>
      <Owner data={userDetails} />
      <Form
        owner={userDetails}
        postTransaction={postTransaction}
        loading={transLoading}
        type="deposit"
      />
    </Modal>
  );
};
export default DepositModal
