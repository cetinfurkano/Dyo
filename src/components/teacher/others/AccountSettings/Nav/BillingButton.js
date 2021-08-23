import React from "react";

function BillingButton() {
  return (
    <a
      href="#billing"
      data-toggle="tab"
      className="nav-item nav-link has-icon nav-link-faded"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-credit-card mr-2"
      >
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
      </svg>
      Ditribütörlerin
    </a>
  );
}

export default BillingButton;
