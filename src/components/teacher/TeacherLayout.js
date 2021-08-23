import React, { useState, useReducer } from "react";
import Navbar from "./Navbar/Navbar";
import SearchBar from "./SearchBar";
import "../../assets/css/teacher/index.css";
import "../../assets/css/teacher/featured.css";
import TeacherOperations from "../../logics/Teacher/TeacherOperations";
import Authentication from "../../logics/Authentication";

export const CartItemContext = React.createContext();

var cart = 0;
if (Authentication.isAuthenticated()) {
  var check = localStorage.getItem("cart-" + TeacherOperations.getUserId());
  cart = check ? JSON.parse(check).length : 0;
}

const initialCart = cart;

const reducer = (state, action) => {
  switch (action) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "reset":
      return 0;
    default:
      return state;
  }
};

function TeacherLayout({ children }) {
  const [searchActive, setSearchActive] = useState(false);
  const [cartItemCount, dispatch] = useReducer(reducer, initialCart);

  return (
    <CartItemContext.Provider
      value={{ countState: cartItemCount, countDispatch: dispatch }}
    >
      <Navbar setSearchActive={setSearchActive} />
      <SearchBar
        searchActive={searchActive}
        setSearchActive={setSearchActive}
      />
      <div>{children}</div>
      <footer>
        <div className="d-flex justify-content-center mt-5">
          Copyright<i className="fa fa-copyright" aria-hidden="true"></i> 2020 -
          Furkan Çetin
        </div>
      </footer>
    </CartItemContext.Provider>
  );
}

export default TeacherLayout;
