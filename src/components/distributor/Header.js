import React from "react";
import Search from "./Search";
import NotificationBar from "./NotificationBar";
import Profile from "./Profile";
import {Link} from "react-router-dom"


function Header({toggleRef,headerPdRef}) {
 
  return (
    <header className="header" id="header" ref={headerPdRef}>
      <div className="header__toggle">
        <i className="bx bx-menu" id="header-toggle" ref={toggleRef}></i>
      </div>
      <div>
        <NotificationBar />
        <Link to="/distributor/accountSettings" component={Profile} />
      </div>
    </header>
  );
}

export default Header;
