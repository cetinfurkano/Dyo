import React,{useRef} from "react";
import Social from "./Social";
import BranchMenu from "./BranchMenu";
import NotificationBar from "./NotificationBar";
import ProfileMenu from "./ProfileMenu";
import CartButton from "./CartButton";
import SearchButton from "./SearchButton";
import {Link} from "react-router-dom"
import Logo from "./Logo"


function Navbar({setSearchActive}) {
  const naviRef = useRef(null);
  
  const toggleClickHandler = (event) => {
    const isActiveToggle = event.target.classList.contains("active");
    const isActiveNavi = naviRef.current.classList.contains("active");

    isActiveToggle ? event.target.classList.remove("active"):event.target.classList.add("active");
    isActiveNavi ? naviRef.current.classList.remove("active"):naviRef.current.classList.add("active");
  }
  
  return (
    <nav className="sticky-top">
      <Social />
      <div ref={naviRef} className="navigation">
        <Link to="/teacher/" component={Logo}/>
        <div className="toggle" onClick={toggleClickHandler}></div>
        <BranchMenu />
        <div className="right-menu">
          <SearchButton setSearchActive={setSearchActive} />
          <NotificationBar />
          <ProfileMenu />
          <Link to="/teacher/cart" component={CartButton}/>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
