import React from "react";
import logo from "../../../assets/img/teacher/logo.png";

// function Logo({href}) {
//   return (
//     <a href={href}className="logo">
//       <img className="img-fluid" src={logo} alt="" />
//     </a>
//   );
// }

const Logo = React.forwardRef((props, ref) => {
  return (
    <a ref={ref} href={props.href} className="logo">
      <img className="img-fluid" src={logo} alt="" />
    </a>
  );
});
export default Logo;
