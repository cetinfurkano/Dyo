import React, { useEffect } from "react";
import NavItem from "./NavItem";
import { Link, Redirect,useHistory } from "react-router-dom";
import Authentication from "../../logics/Authentication";

function Navbar({ navRef }) {
  useEffect(() => {
    const linkColor = document.querySelectorAll(".nav__link");

    function colorLink() {
      if (linkColor) {
        linkColor.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      }
    }
    linkColor.forEach((l) => l.addEventListener("click", colorLink));
    return () => {
      linkColor.forEach((l) => l.removeEventListener("click", colorLink));
    };
  }, []);
  
  const history = useHistory();
  const handleLogout = (e) => {
    e.preventDefault();
    Authentication.logout(() => console.log("logout"));
    history.push("/login");
  };

  return (
    <div className="l-navbar" id="nav-bar" ref={navRef}>
      <nav className="nav">
        <div>
          {/* <a href="#" className="nav__logo">
            <i className="bx bx-layer nav__logo-icon"></i>
            <span className="nav__logo-name">DYO</span>
          </a> */}
          <Link
            to="/distributor/"
            icon="bx bx-layer nav__logo-icon"
            text="DYO"
            className="nav__logo"
            spanClassName="nav__logo-name"
            component={NavItem}
          />
          <div className="nav__list">
            <Link
              to="/distributor/teachers"
              icon="bx bx-user nav__icon"
              text="Öğretmenlerim"
              className="nav__link"
              spanClassName="nav__name"
              component={NavItem}
            />
            <Link
              to="/distributor/publishers"
              icon="bx bx-message-square-detail nav__icon"
              text="Yayınevlerim"
              className="nav__link"
              spanClassName="nav__name"
              component={NavItem}
            />
            <Link
              to="/distributor/products"
              icon="bx bx-bookmark nav__icon"
              text="Siparişlerim"
              text="Ürünlerim"
              className="nav__link"
              spanClassName="nav__name"
              component={NavItem}
            />
            <Link
              to="/distributor/orders"
              icon="bx bx-folder nav__icon"
              text="Siparişlerim"
              className="nav__link"
              spanClassName="nav__name"
              component={NavItem}
            />
            <Link
              to="/distributor/performance"
              icon="bx bx-bar-chart-alt-2 nav__icon"
              text="Performansım"
              className="nav__link"
              spanClassName="nav__name"
              component={NavItem}
            />
          </div>
        </div>

        <a href="#" className="nav__link" onClick={handleLogout}>
          <i className="bx bx-log-out nav__icon"></i>
          <span className="nav__name">Çıkış</span>
        </a>
      </nav>
    </div>
  );
}

export default Navbar;
