import React from "react";
import { Link, useHistory } from "react-router-dom";
import Authentication from "../../../logics/Authentication";
import ProfileMenuItem from "./ProfileMenuItem";

function ProfileMenu() {
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    Authentication.logout(() => console.log("logout"));
    history.push("/login");
  };

  return (
    <div className="dropdown d-inline">
      <button
        type="button"
        className="btn user"
        id="profileDropdown"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fa fa-user-o" aria-hidden="true"></i>
      </button>
      <div
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="profileDropdown"
      >
        <Link
          to="/teacher/accountSettings"
          text="Profile Git"
          icon="fa fa-user"
          component={ProfileMenuItem}
        />
        <Link
          to="/teacher/favorites"
          text="Favorilerim"
          icon="fa fa-heart"
          component={ProfileMenuItem}
        />
        <Link
          to="/teacher/orders"
          text="Siparişlerim"
          icon="fa fa-luggage-cart"
          component={ProfileMenuItem}
        />
        
        <a className="dropdown-item sign-out" href="#" onClick={handleLogout}>
          <i className="fa fa-sign-out" aria-hidden="true"></i>
          Çıkış
        </a>
      </div>
    </div>
  );
}

export default ProfileMenu;
