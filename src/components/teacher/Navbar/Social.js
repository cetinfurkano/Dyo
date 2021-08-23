import React from "react";

function Social() {
  console.log("social render");
  return (
    <div className="social-call">
      <div className="social">
        <a href="#">
          <i className="fa fa-facebook" aria-hidden="true"></i>
        </a>
        <a href="#">
          <i className="fa fa-twitter" aria-hidden="true"></i>
        </a>
        <a href="#">
          <i className="fa fa-youtube-play" aria-hidden="true"></i>
        </a>
        <a href="#">
          <i className="fa fa-instagram" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
}

export default Social;
