import React,{useContext} from "react";
import {CartItemContext} from "../TeacherLayout";

const CartButton = React.forwardRef((props, ref) => {
  const countContext = useContext(CartItemContext);

  return (
    <a href={props.href} ref={ref}>
      <i className="fa fa-shopping-cart" aria-hidden="true">
        <span className="num-cart-product">{countContext.countState}</span>
      </i>
    </a>
  );
});
export default CartButton;
