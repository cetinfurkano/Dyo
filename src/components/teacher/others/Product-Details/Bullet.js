import React from "react";

function Bullet({text}) {
  return (
    <div className="d-flex align-items-center">
      <span className="dot"></span>
      <span className="bullet-text">{text}</span>
    </div>
  );
}

export default Bullet;
