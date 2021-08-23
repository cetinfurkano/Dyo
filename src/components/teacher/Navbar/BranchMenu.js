import React from "react";

function BranchMenu() {
  console.log("branch render");
  return (
    <ul className="menu">
      <li>
        <a href="#">Lise</a>
      </li>
      <li>
        <a href="#">İlkokul</a>
      </li>
      <li>
        <a href="#">Ortaokul</a>
      </li>
      <li>
        <a href="#">Okul Öncesi</a>
      </li>
    </ul>
  );
}

export default BranchMenu;
