import React, { useState, useRef, useEffect } from "react";
import InputField from "./SubComponents/InputField";
import Socials from "./SubComponents/Socials";
import Authentication from "../../logics/Authentication";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";

function SignIn({setRedirectToReferrer}) {
  const [loginType, setLoginType] = useState(1);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [loginInfo,setLoginInfo] = useState({
    email:"",
    password:""
  });

  const onChangeEmail = (e) => {
    setLoginInfo({...loginInfo, email:e.target.value});
  }
  const onChangePassword = (e) => {
    setLoginInfo({...loginInfo, password:e.target.value});
  }
  
  
  const refDist = useRef(null);
  const refTeach = useRef(null);

 
  useEffect(() => {
    if (loginType === 1) {
      if (!refDist.current.classList.contains("activeType")) {
        refDist.current.classList.add("activeType");
      }
      refTeach.current.classList.remove("activeType");
    } else {
      if (!refTeach.current.classList.contains("activeType")) {
        refTeach.current.classList.add("activeType");
      }
      refDist.current.classList.remove("activeType");
    }
  });


  const handleSubmit = (e) => {
    console.log(loginType);
    e.preventDefault();
    Authentication.login({ data:loginInfo, loginType:loginType }, () => {
      setRedirectToReferrer(true);
    });
  };

  return (
    <form action="#" className="sign-in-form">
      <h2 className="title">Giriş</h2>
      <InputField icon="fas fa-user" placeholder="Eposta" onChange={onChangeEmail} />
      <InputField
        icon="fas fa-lock"
        placeholder="Şifre"
        onChange={onChangePassword}
        type="password"
      />
      <input
        type="submit"
        value="Giriş"
        className="btn solid"
        onClick={handleSubmit}
      />

      <div className="registerTypes">
        <button
          type="button"
          className="btn btn-dist activeType"
          onClick={(e) => setLoginType(1)}
          ref={refDist}
        >
          Distribütör
        </button>
        <button
          type="button"
          className="btn btn-teacher"
          onClick={(e) => setLoginType(0)}
          ref={refTeach}
        >
          Öğretmen
        </button>
      </div>
      <p className="social-text">
        <strong>Bizi Takip Et</strong>
      </p>
      <Socials />
    </form>
  );
}

export default SignIn;
