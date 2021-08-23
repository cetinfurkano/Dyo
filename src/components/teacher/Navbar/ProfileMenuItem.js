import React from "react";

// function ProfileMenuItem({ href, text, icon }) {
//   return (
//     <a className="dropdown-item" href={href}>
//       <i className={icon} aria-hidden="true"></i>
//       {text}
//     </a>
//   );
// }

// export default ProfileMenuItem;

const ProfileMenuItem = React.forwardRef((props, ref) => {
  return (
    <a ref={ref} className="dropdown-item" href={props.href}>
      <i className={props.icon} aria-hidden="true"></i>
      {props.text}
    </a>
  );
});

export default ProfileMenuItem;
