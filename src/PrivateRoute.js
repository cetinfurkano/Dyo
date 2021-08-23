import React from "react";
import { Redirect, Route } from "react-router";
import Authentication from "./logics/Authentication";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
       return Authentication.isAuthenticated() && Authentication.getLoginType() === rest.typeID ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

export default PrivateRoute;
