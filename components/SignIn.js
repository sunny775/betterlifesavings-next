import React from "react";
import styled from "styled-components";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { uiConfig, app } from "../config/firebase";
import useAuth from '../hooks/auth';
import {useRouter} from 'next/router'

const SignIn = styled.div`
  margin-top: 100px;
  background: white;
  padding-top: 60px;
  padding-bottom: 100px;
  text-align: center;
`;

function SignInModal() {
  const router = useRouter();
  const {data} = useAuth();

  data && data.isAuth && router.push('/account');

  return (
    <SignIn>
      <div style={{ margin: "20px 0" }}>
        <strong>Please sign-in</strong>
      </div>
      <StyledFirebaseAuth
        uiConfig={uiConfig()}
        firebaseAuth={app.auth}
      />
    </SignIn>
  );
}
export default SignInModal;
