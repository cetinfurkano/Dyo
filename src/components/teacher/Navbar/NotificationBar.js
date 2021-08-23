import React from 'react'


function NotificationBar() {
    //burada proplar ile gelecek bildirimler map fonksiyonu ile çoğaltılacak.
    console.log("notify render");
    return (
        <div className="dropdown d-inline">
        <button
          className="btn"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fa fa-bell" aria-hidden="true"></i>
        </button>

        <ul
          className="dropdown-menu dropdown-menu-right notif"
          aria-labelledby="dropdownMenuButton"
        >
          <li>
            <a href="#" className="top-text-block unread">
              <div className="top-text-heading">
                You have <b>3 new themes</b> trending
              </div>
              <div className="top-text-light">15 minutes ago</div>
            </a>
          </li>
          <li>
            <a href="#" className="top-text-block">
              <div className="top-text-heading">
                New asset recommendations in <b>Gaming Laptop</b>
              </div>
              <div className="top-text-light">2 hours ago</div>
            </a>
          </li> 
          <div className="notify-drop-footer text-center">
            <a href="">
              <i className="fa fa-eye"></i> Tümünü Okundu İşaretle
            </a>
          </div>
        </ul>
      </div>
    )
}

export default NotificationBar
