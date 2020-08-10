import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../hooks/auth";

function SignInRoute({ children, ...rest }) {
    const {data} = useAuth()
    console.log('wo:', user)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        data && data.isAuth ? (
            <Redirect
            to={{
              pathname: "/account",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
}
export default SignInRoute
