import React from "react";
import log from "../../assets/img/log.svg"
import register from "../../assets/img/register.svg"

function Panel({handleClickLogin, handleClickSignUp}) {

  const signUpBtnClick = (event) => {
    // setContainerClass("LoginContainer sign-up-mode");
    handleClickLogin(event);
  }

  const signInBtnClick = (event) => {
    // setContainerClass("LoginContainer");
    handleClickSignUp(event);
  }

  return (
    <div className="panels-container">
      <div className="panel left-panel">
        <div className="content">
          <h3>Burada yeni misin ?</h3>
          <p>
            Hemen üye olup, DYO'nun eşsiz fırsatlarından ve yeni teknolojisinden yararlanabilirsin!
          </p>
          <button onClick={signUpBtnClick} className="btn transparent" id="sign-up-btn">
            Kaydol
          </button>
        </div>
        <img src={log} className="image" alt="" />
      </div>
      <div className="panel right-panel">
        <div className="content">
          <h3>Bizden biri misin ?</h3>
          <p>
            Teknolojinin ve <strong>DYO'nun</strong> sağladığı ayrıcalıklı yeniliklerden faydalanmak için
            hemen kayıt ol!
          </p>
          <button onClick={signInBtnClick} className="btn transparent" id="sign-in-btn">
            Giriş
          </button>
        </div>
        <img src={register} className="image" alt="" />
      </div>
    </div>
  );
}

export default Panel;
