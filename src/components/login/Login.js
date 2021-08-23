import React, { useState, useRef } from "react";
import "../../assets/css/login.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Panel from "./Panel";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import Authentication from "../../logics/Authentication";

function Login() {
  const containerRef = useRef(null);
  const handleClickLogin = (e) => {
    containerRef.current.classList.add("sign-up-mode");
  };

  const handleClickSignUp = (e) => {
    containerRef.current.classList.remove("sign-up-mode");
  };
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const { state } = useLocation();


  if (redirectToReferrer === true) {
    const location =
      Authentication.getLoginType() === 1 ? "/distributor/" : "/teacher/";
      console.log("referrerLocation: " + location);

    return <Redirect to={state?.from || location} />;
  }

  if(Authentication.isAuthenticated()){
   let locat;
   console.log("LoginType şuan: " + Authentication.getLoginType());
    switch (Authentication.getLoginType()) {
      case 1:
        locat = "/distributor/";
        return <Redirect to={locat}/>;
        case 0: locat  = "/teacher/";
        return <Redirect to={locat}/> ;
      default:
        break;
    } 
  }

  return (
    <div className="LoginContainer" ref={containerRef}>
      <div className="forms-container">
        <div className="signin-signup">
          <SignIn setRedirectToReferrer={setRedirectToReferrer} />
          <SignUp setRedirectToReferrer={setRedirectToReferrer} />
        </div>
      </div>
      <Panel
        handleClickLogin={handleClickLogin}
        handleClickSignUp={handleClickSignUp}
      />
    </div>
  );
}

export default Login;
