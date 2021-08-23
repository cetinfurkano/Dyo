import React from "react";

function IndexCard({icon, text, count}) {
  return (
    <div className="col-lg-3 col-sm-6">
      <div className="card">
        <div className="card-body">
          <i
            className={icon}
            aria-hidden="true"
          ></i>
          <p className="text-primary-p">{text}</p>
          <span className="font-bold text-title">{count}</span>
        </div>
      </div>
    </div>
  );
}

export default IndexCard;
