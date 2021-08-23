import React, { useState } from "react";
import TeacherOperations from "../../../../logics/Teacher/TeacherOperations";
import { useHistory } from "react-router-dom";

function CartItem({ itemCategory, itemName, itemId, itemPrice, itemSrc,handleRemoveItem,setInfo }) {
  const history = useHistory();

  const item = localStorage.getItem("cart-" + TeacherOperations.getUserId());
  const arr = JSON.parse(item);

  const [priceCount, setPriceCount] = useState({
    price: itemPrice * arr.filter((p) => p.id == itemId)[0].count,
    count: arr.filter((p) => p.id == itemId)[0].count,
  });

  const handleClickItemName = (e) => {
    history.push("/teacher/productDetails/" + itemId);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (priceCount.count > 1) {
      var index = arr.findIndex((p) => p.id == itemId);
      arr[index].count = priceCount.count - 1;

      localStorage.setItem(
        "cart-" + TeacherOperations.getUserId(),
        JSON.stringify(arr)
      );
      setPriceCount((prev) => {
        return {
          price: itemPrice * (prev.count - 1),
          count: prev.count - 1,
        };
      });
      setInfo(prev => {
         return prev -  itemPrice
      });
    }
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    var index = arr.findIndex((p) => p.id == itemId);
    arr[index].count = priceCount.count + 1;
    localStorage.setItem(
      "cart-" + TeacherOperations.getUserId(),
      JSON.stringify(arr)
    );
    setPriceCount((prev) => {
      return {
        price: itemPrice * (prev.count + 1),
        count: prev.count + 1,
      };
    });
    setInfo(prev => {
      return prev +  itemPrice
   });
  };

  return (
    <div className="row border-top border-bottom">
      <div className="row main align-items-center">
        <div className="col-2">
          <img className="img-fluid" src={itemSrc} />
        </div>
        <div className="col">
          <div className="row text-muted">{itemCategory}</div>
          <div className="row name-link" onClick={handleClickItemName}>
            {itemName}
          </div>
        </div>
        <div className="col">
          <a href="#" onClick={handleDecrement}>
            -
          </a>
          <a href="#" className="border">
            {priceCount.count}
          </a>
          <a href="#" onClick={handleIncrement}>
            +
          </a>
        </div>
        <div className="col">
          {priceCount.price} <i className="fa fa-try" aria-hidden="true"></i>
          <span className="close" onClick={e => handleRemoveItem(priceCount.price, itemId)}>&#10005;</span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
