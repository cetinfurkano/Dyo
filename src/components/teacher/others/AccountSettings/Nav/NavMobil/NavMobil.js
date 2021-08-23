import React from "react";
import MobileProfileButton from "./MobileProfileButton";
import MobileAccountButton from "./MobileAccountButton";
import MobileSecurityButton from "./MobileSecurityButton";
import MobileBillingButton from "./MobileBillingButton";

function NavMobil() {
  return (
    <div className="card-header border-bottom mb-3 d-flex d-md-none">
      <ul className="nav nav-tabs card-header-tabs nav-gap-x-1" role="tablist">
        <MobileProfileButton />
        <MobileAccountButton />
        <MobileSecurityButton />
        <MobileBillingButton />
      </ul>
    </div>
  );
}

export default NavMobil;
