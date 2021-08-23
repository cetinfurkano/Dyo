import React from "react";

// function NavItem({ href, icon, text }) {
//   return (
//     <a href={href} className="nav__link">
//       <i className={icon}></i>
//       <span className="nav__name">{text}</span>
//     </a>
//   );
// }

const NavItem = React.forwardRef((props, ref) => {
  return (
    <a ref={ref} href={props.href} className={props.className}>
      <i className={props.icon}></i>
      <span className={props.spanClassName}>{props.text}</span>
    </a>
  );
});

export default NavItem;
