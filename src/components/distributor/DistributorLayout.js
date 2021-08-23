import React, { useEffect, useState, useRef } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import "../../assets/css/distributor/index.css";
import Footer from "./Footer";

function DistributorLayout({ children }) {
  const toggleRef = useRef(null);
  const navRef = useRef(null);
  const headerPdRef = useRef(null);
  
  useEffect(() => {
    document.documentElement.style.setProperty("--header-height", "3rem");
    document.documentElement.style.setProperty("--nav-width", "68px");
    document.documentElement.style.setProperty("--first-color", "#4723D9");
    document.documentElement.style.setProperty(
      "--first-color-light",
      "#AFA5D9"
    );
    document.documentElement.style.setProperty("--white-color", "#F7F6FB");
    document.documentElement.style.setProperty(
      "--body-font",
      "'Nunito', sans-serif"
    );
    document.documentElement.style.setProperty("--normal-font-size", "1rem");
    document.documentElement.style.setProperty("--z-fixed", "100");
  });
  useEffect(() => {
    function toggleClickHandler() {
      const body = document.getElementsByTagName("body")[0];
      navRef.current.classList.toggle("show");
      toggleRef.current.classList.toggle("bx-x");
      body.classList.toggle("body-pd");
      headerPdRef.current.classList.toggle("body-pd");
    }

    toggleRef.current.addEventListener("click", toggleClickHandler);

    return () => {
      //toggleRef.current.removeEventListener("click", toggleClickHandler);
    };
  },[]);

  
  return (
    <div className="DistributorIndex">
      <Header toggleRef={toggleRef} headerPdRef={headerPdRef} />
      <Navbar navRef={navRef} />
      {children}
      <Footer />
    </div>
  );
}

export default DistributorLayout;
