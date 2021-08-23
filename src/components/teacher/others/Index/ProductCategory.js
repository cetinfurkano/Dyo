import React from "react";

// function ProductCategory({src, href, title}) {
//   return (
//     <li className="item">
//       <div className="feature-box">
//         <a href={href}>
//           <img src={src} />
//         </a>
//       </div>
//       <span>{title}</span>
//     </li>
//   );
// }

const ProductCategory = React.forwardRef((props, ref) => {
  return (
    <li ref={ref} className="item">
      <div className="feature-box">
        <a href={props.href}>
          <img src={props.src} />
        </a>
      </div>
      <span>{props.title}</span>
    </li>
  );
});
export default ProductCategory;
