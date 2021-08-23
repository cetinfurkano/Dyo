import React, { useState, useEffect, useContext } from "react";
import "../../../../assets/css/teacher/product-details.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Related from "./Related";
import ProductImages from "./ProductImages";
import Rewiews from "./Rewiews";
import ProductDescription from "./ProductDescription";
import TeacherOperations from "../../../../logics/Teacher/TeacherOperations";
import { useRouteMatch, useParams,useHistory } from "react-router-dom";
import { CartItemContext } from "../../TeacherLayout";
import alertify from "alertifyjs";

function ProductDetails() {
  var { productId } = useParams();
  const [product, setProduct] = useState();
  const countContext = useContext(CartItemContext);
  const history = useHistory();

  useEffect(() => {
    TeacherOperations.getProductDetail(productId, (data) => {
      setProduct(data);
    });
  }, []);

  const handleClickAddCart = (e) => {
    const userId = TeacherOperations.getUserId();
    const classList = e.target.classList;
    classList.toggle("cart-added");

    if (classList.contains("cart-added")) {
      e.target.innerHTML = "Sepete Eklendi!";
      alertify.success("Sepete eklendi!");
     
      const cartItemsString = localStorage.getItem("cart-" + userId);
      if (cartItemsString) {
        const cartItems = JSON.parse(cartItemsString);
        cartItems.push({ id: productId, count: 1 });
        localStorage.setItem("cart-" + userId, JSON.stringify(cartItems));
      }
      else{
        const items = [{ id: productId, count: 1 }];
        localStorage.setItem("cart-"+userId, JSON.stringify(items));
      } 
      countContext.countDispatch("increment");
    } else {
      e.target.innerHTML = "Sepete Ekle";
      alertify.error("Sepetten çıkarıldı!");
  
      const cartItemsString = localStorage.getItem("cart-" + userId);
      if (cartItemsString) {
        const cartItems = JSON.parse(cartItemsString);
        const itemIndex = cartItems.findIndex((c) => c.id === productId);
        cartItems.splice(itemIndex, 1);
        localStorage.setItem("cart-" + userId, JSON.stringify(cartItems));
      }
      countContext.countDispatch("decrement");
    }
  };

  const handleClickAddFavor = (e) => {
    const userId = TeacherOperations.getUserId();
    const classList = e.target.classList;
    classList.toggle("favored");
    if (classList.contains("favored")) {
      const favoredItemsString = localStorage.getItem("favor-" + userId);
      if(favoredItemsString){
        const favoredItems = JSON.parse(favoredItemsString);
        favoredItems.push(productId);
        localStorage.setItem("favor-" + userId, JSON.stringify(favoredItems));
      }
      else{
        const items = [productId];
        localStorage.setItem("favor-"+userId, JSON.stringify(items));
      }
      alertify.success("Favorilere Eklendi!");
    }else{
      const favoredItemsString = localStorage.getItem("favor-" + userId);
      if (favoredItemsString) {
        const favoredItems = JSON.parse(favoredItemsString);
        const itemIndex = favoredItems.indexOf(productId);
        var newFavoreds = favoredItems.splice(itemIndex, 0);
        localStorage.setItem("favor-" + userId, JSON.stringify(newFavoreds));
        alertify.error("Favorilerden çıkarıldı!");
      }
    }
  };

  const getCanAddCart = () => {
    const userId = TeacherOperations.getUserId();
    const cartString = localStorage.getItem("cart-" + userId);
    if (cartString) {
      const list = JSON.parse(cartString);
      const contains = list.findIndex(p => p.id == productId) > -1 ? true: false;
      return contains ? "cart-added" : "";
    }
   return "";
  }
  const getCanFavor = () => {
    const userId = TeacherOperations.getUserId();
    const favorString = localStorage.getItem("favor-" + userId);
    if (favorString) {
      const list = JSON.parse(favorString);
      const contains = list.includes(productId);
      return contains ? "favored" : "";
    }
   return "";
  }

  const handleClickBuy = (e) => {
    const userId = TeacherOperations.getUserId();
    const cartItemsString = localStorage.getItem("cart-" + userId);
    if (cartItemsString) {
      const cartItems = JSON.parse(cartItemsString);
      if(cartItems.findIndex(item => item.id == productId) < 0){
        cartItems.push({id: productId, count: 1});
        localStorage.setItem("cart-"+userId, JSON.stringify(cartItems));
        countContext.countDispatch("increment");
      }
      history.push("/teacher/cart");
    }
  }
  

  return product != null ? (
    <div className="ProductDetails">
      <div className="container mt-2 mb-3">
        <div className="row no-gutters">
          <div className="col-md-5 pr-2">
            <ProductImages images={product.images} />
            {/* <Rewiews /> */}
          </div>
          <div className="col-md-7">
            <div className="card">
              <div className="d-flex flex-row align-items-center">
                <div className="p-ratings">
                  <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                </div>
                <span className="ml-1">5.0</span>
              </div>
              <div className="about">
                <span className="font-weight-bold">{product.productName}</span>
                <h4 className="font-weight-bold">{product.price + "₺"}</h4>
              </div>
              <div className="buttons">
                <button
                  type="button"
                  className={"btn btn-outline-warning btn-long cart " + getCanAddCart()}
                  onClick={handleClickAddCart}
                >
                 {getCanAddCart() == "cart-added" ? "Sepete Eklendi!" : "Sepete Ekle"}
                </button>
                <button type="button" className="btn btn-warning btn-long buy" onClick={handleClickBuy}>
                  Satın al
                </button>
                <button
                  type="button"
                  className={"btn btn-light wishlist " + getCanFavor()}
                  onClick={handleClickAddFavor}
                >
                  <i className="fa fa-heart"></i>
                </button>
              </div>
              <hr />
              <ProductDescription product={product} />
            </div>
            <Related product={product} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default ProductDetails;
