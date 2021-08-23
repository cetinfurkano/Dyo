import React from "react";

function ChartRightCard({title, text, type}) {
  return (
    <div className="col-lg-6 col-md-12 mb-1">
      <div className="card">
        <div className={"card-body "+type+" text-center"}>
          <h3 className="cart-title">{title}</h3>
          <p className="card-text">
            <i className="fa fa-try" aria-hidden="true"></i>{text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChartRightCard;
