import React from "react";

function NotificationBar() {
  return (
    <div className="dropdown d-inline">
      <button
        type="button"
        className="btn"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fa fa-bell-o" aria-hidden="true"></i>
        <span className="badge badge-warning">9</span>
        <span className="sr-only">unread messages</span>
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="#">
          Action
        </a>
        <a className="dropdown-item" href="#">
          Another action
        </a>
        <a className="dropdown-item" href="#">
          Something else here
        </a>
      </div>
    </div>
  );
}

export default NotificationBar;
