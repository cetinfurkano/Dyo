import React from 'react'
import ProfileInfoButton from "./ProfileInfoButton"
import AccountButton from "./AccountButton"
import SecurityButton from "./SecurityButton"
import BillingButton from "./BillingButton"

function Nav() {
    return (
        <div className="card">
              <div className="card-body">
                <nav className="nav flex-column nav-pills nav-gap-y-1">
                 <ProfileInfoButton />
                  <AccountButton />
                  <SecurityButton />
                  <BillingButton />
                </nav>
              </div>
            </div>
    )
}

export default Nav
