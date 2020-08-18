import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Spinner } from "react-bootstrap";
import styled from "styled-components";
import Link from 'next/link';
import { useRouter } from "next/router";
import { SubmitBtn } from "../../SubmitBtn";
import useAuth from "../../../hooks/auth";
import useMessage from "../../../hooks/tickets";
import Owner from "./owner";
import { SuccessAlert } from "../../alerts";

const LoadingOverlay = styled.div`
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Div = styled.div`
  margin: 150px 10vw;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 50px 20px;
  @media (min-width: 500px) {
    margin: 150px 20vw;
  }
`;
const FormWrapper = styled.div`
  display: ${(props) => (props.text ? "none" : "block")};
`;
const Return  = styled.a`
font-weight: bold;
background: #b9f6ca;
padding : 7px 20px;
border-radius: 15px;
`
const schema = yup.object({
  email: yup.string().email("*Enter a valid email address"),
  subject: yup.string().required(),
  message: yup
    .string()
    .min(30, "*message is too short")
    .required("*Phone number required"),
});

function EditProfileForm() {
  const user = useAuth();
  const router = useRouter();
  const { postMessage, successText, hideAlert, loading } = useMessage();
  const { data, userDetails } = user;

  if (data && userDetails) {
    const init = { ...data, ...userDetails };
    data && !data.isAuth && router.push("/sign-in");
    userDetails && data.isAuth && !userDetails.username && router.push("/settings/edit-profile");
    return (
      <Div>
        <SuccessAlert alertText={successText} hideAlert={hideAlert} />
        <Owner data={userDetails} text={successText} />
        {successText && <Link href='/account'><Return>&#8592;Account</Return></Link>}
        <FormWrapper text={successText}>
          <Formik
            validationSchema={schema}
            onSubmit={(value) =>
              postMessage({ details: value, senderInfo: userDetails })
            }
            initialValues={{
              email: init.email || "",
              subject: "",
              message: "",
            }}
          >
            {({ getFieldProps, touched, errors, handleSubmit }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group md="4" controlId="Formik02">
                  <Form.Label srOnly>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    {...getFieldProps("email")}
                  />
                </Form.Group>
                <Form.Group md="4" controlId="Formik04">
                  <Form.Label srOnly>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    placeholder="subject"
                    {...getFieldProps("subject")}
                    isValid={touched.subject && !errors.subject}
                    isInvalid={touched.subject && !!errors.subject}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.subject}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group md="4" controlId="Formik05">
                  <Form.Label srOnly>Message</Form.Label>
                  <Form.Control
                    type="textarea"
                    name="message"
                    placeholder="message"
                    {...getFieldProps("message")}
                    isValid={touched.message && !errors.message}
                    isInvalid={touched.message && !!errors.message}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <SubmitBtn loading={loading} text="send" />
              </Form>
            )}
          </Formik>
        </FormWrapper>
      </Div>
    );
  }
  return (
    <LoadingOverlay>
      <Spinner animation="border" role="status" variant="dark">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </LoadingOverlay>
  );
}
export default EditProfileForm;
