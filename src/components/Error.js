import React, { useEffect } from "react";
import "../assets/css/error.css";
import { Link } from "react-router-dom";
import Authentication from "../logics/Authentication";

function Error() {
  useEffect(() => {
    document.body.style.height = "100vh";
    document.body.style.background =
      "-webkit-repeating-linear-gradient(-45deg, #71b7e6, #69a6ce, #b98acc, #ee8176, #b98acc, #69a6ce, #9b59b6);";
    document.body.style.backgroundSize = "400%";
  }, []);

  return (
    <div id="error-page">
      <div className="content">
        <h2 className="header" data-text="404">
          404
        </h2>
        <h4 data-text="Opps! Page not found">Hay aksi! Sayfa bulunamadı.</h4>
        <p>Maalesef aradığınız sayfaya ulaşılamadı!</p>
        <div className="btns">
          {/* <a href="https://www.codingnepalweb.com/">Anasayfa</a> */}
          {Authentication.isAuthenticated() ? (
            Authentication.getLoginType() === 1 ? (
              <Link to="/distributor/">Anasayfa</Link>
            ) : (
              <Link to="/teacher">Anasayfa</Link>
            )
          ) : (
            <Link to="/login/">Giriş</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Error;
