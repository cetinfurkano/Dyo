import React, { useState, useContext } from "react";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";
import TeacherOperations from "../../../logics/Teacher/TeacherOperations";
import { CartItemContext } from "../TeacherLayout";

function Product({ product }) {
  const [displayedProduct, setDisplayedProduct] = useState(product);

  const countContext = useContext(CartItemContext);

  const handleFavorClick = (event) => {
    var userId = TeacherOperations.getUserId();
    var productId = product.id;
    var classList = event.target.classList;
    var contains = classList.contains("favor");
    contains
      ? classList.replace("favor", "favored")
      : classList.replace("favored", "favor");
    if (contains) {
      const favoredItemsString = localStorage.getItem("favor-" + userId);
      if (favoredItemsString) {
        const favoredItems = JSON.parse(favoredItemsString);
        favoredItems.push(productId);
        localStorage.setItem("favor-" + userId, JSON.stringify(favoredItems));
      } else {
        const items = [productId];
        localStorage.setItem("favor-" + userId, JSON.stringify(items));
      }
      alertify.success("Favorilere Eklendi!");
    } else {
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

  const handleAddClick = (event) => {
    var userId = TeacherOperations.getUserId();
    var productId = product.id;

    var classList = event.target.classList;
    var contains = classList.contains("add");
    contains
      ? classList.replace("add", "added")
      : classList.replace("added", "add");
    if (contains) {
      const cartItemsString = localStorage.getItem("cart-" + userId);
      if (cartItemsString) {
        const cartItems = JSON.parse(cartItemsString);
        cartItems.push({ id: productId, count: 1 });
        localStorage.setItem("cart-" + userId, JSON.stringify(cartItems));
      } else {
        const items = [{ id: productId, count: 1 }];
        localStorage.setItem("cart-" + userId, JSON.stringify(items));
      }
      alertify.success("Sepete eklendi!");
      countContext.countDispatch("increment");
    } else {
      const cartItemsString = localStorage.getItem("cart-" + userId);
      if (cartItemsString) {
        const cartItems = JSON.parse(cartItemsString);
        const itemIndex = cartItems.findIndex((c) => c.id === productId);
        cartItems.splice(itemIndex, 1);
        localStorage.setItem("cart-" + userId, JSON.stringify(cartItems));
      }
      alertify.error("Sepetten çıkarıldı!");
      countContext.countDispatch("decrement");
    }
  };

  const getCanAddCart = () => {
    const userId = TeacherOperations.getUserId();
    const cartString = localStorage.getItem("cart-" + userId);
    if (cartString) {
      const list = JSON.parse(cartString);
      if (list.length > 0) {
        var index = list.findIndex((c) => c.id == product.id);
        return index > -1 ? "added" : "add";
      }
    }
    return "add";
  };
  const getCanFavor = () => {
    const userId = TeacherOperations.getUserId();
    const favorString = localStorage.getItem("favor-" + userId);
    if (favorString) {
      const list = JSON.parse(favorString);
      if (list.length > 0) {
        const contains = list.includes(product.id);
        return contains ? "favored" : "favor";
      }
    }
    return "favor";
  };

  const getActive = (index) => {
    return index == 0 ? "active": "";
  }
  

  return (
    <div className="card rounded shadow-sm border-0">
      <div className="card-body p-4 card-product">
        <div className="action-buttons mb-3">
          <span style={{ float: "left" }}>
            <i
              onClick={handleAddClick}
              className={"fa fa-shopping-cart " + getCanAddCart()}
              aria-hidden="true"
            ></i>
          </span>
          <span style={{ float: "right" }} onClick={handleFavorClick}>
            <i
              className={"fa fa-heart " + getCanFavor()}
              aria-hidden="true"
            ></i>
          </span>
        </div>
        {/* Fotoğrafları */}
        <div
          id={displayedProduct.id}
          className="carousel slide"
          data-interval="false"
        >
          <div className="carousel-inner">
            {displayedProduct.images.map((image, index) => (
              <div className={"carousel-item " + getActive(index)} key={index}>
                <img
                  src={image.url}
                  alt=""
                  className="img-fluid d-block mx-auto mb-3"
                />
              </div>
            ))}
          </div>
          <a
            className="carousel-control-prev"
            href={"#" + displayedProduct.id}
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </a>
          <a
            className="carousel-control-next"
            href={"#" + displayedProduct.id}
            data-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </a>
        </div>
        <h5>
          <Link
            to={"/teacher/productDetails/" + displayedProduct.id}
            className="text-dark"
          >
            {displayedProduct.productName}
          </Link>
        </h5>
        <p className="small text-muted font-italic">
          {displayedProduct.productDescription}
          <br />
          {displayedProduct.publisherName} Yayınevi
        </p>
        {/* kaç yıldız aldığı */}
        <ul className="list-inline small">
          <li className="list-inline-item m-0">
            <i className="fa fa-star text-success"></i>
          </li>
          <li className="list-inline-item m-0">
            <i className="fa fa-star text-success"></i>
          </li>
          <li className="list-inline-item m-0">
            <i className="fa fa-star text-success"></i>
          </li>
          <li className="list-inline-item m-0">
            <i className="fa fa-star text-success"></i>
          </li>
          <li className="list-inline-item m-0">
            <i className="fa fa-star-o text-success"></i>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Product;
