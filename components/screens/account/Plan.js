import React from "react";
import { Modal, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Button } from "react-bootstrap";
import { SubmitBtn } from "../../SubmitBtn";

const Header = styled(Modal.Header)`
  background: #2e7d32;
  color: white;
  letter-spacing: 2px;
`;
const schema = yup.object({
  plan: yup.string().required(),
});

const Plan = ({ open, close, setPlan, loading }) => {
  const handleClose = () => close();

  return (
    <Modal centered show={open} onHide={handleClose}>
      <Header closeButton>
        <p>Select a savings plan that suits your need.</p>
      </Header>

      <Formik
        validationSchema={schema}
        onSubmit={(values) => setPlan(values.plan)}
        initialValues={{
          plan: "",
        }}
      >
        {({ setFieldValue, touched, errors, handleSubmit, values }) => (
          <Div>
            <Form noValidate onSubmit={handleSubmit}>
              <fieldset>
                <Form.Group as={Row}>
                  <Form.Label as="legend" column sm={6}>
                    Select a Savings Plan
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Check
                      style={{ textAlign: "left" }}
                      type="radio"
                      label="Daily Plan"
                      name="plan"
                      value="daily"
                      checked={values.plan === "daily"}
                      onChange={() => setFieldValue("plan", "daily")}
                    />
                    <Form.Check
                      style={{ textAlign: "left" }}
                      type="radio"
                      label="Weekly Plan"
                      name="plan"
                      value="weekly"
                      checked={values.plan === "weekly"}
                      onChange={() => setFieldValue("plan", "weekly")}
                    />
                    <Form.Check
                      style={{ textAlign: "left" }}
                      type="radio"
                      label="Monthly Plan"
                      name="plan"
                      value="monthly"
                      checked={values.plan === "monthly"}
                      onChange={() => setFieldValue("plan", "monthly")}
                    />
                  </Col>
                  <div
                    style={{
                      margin: "5px auto",
                      color: "#d84315",
                      fontSize: "13px",
                    }}
                  >
                    {touched.plan && !!errors.plan ? errors.plan : ""}
                  </div>
                </Form.Group>
              </fieldset>

              <SubmitBtn loading={loading} text="set plan" />
            </Form>
          </Div>
        )}
      </Formik>
    </Modal>
  );
};
export default Plan;

const Div = styled.div`
  padding: 30px;
`;
