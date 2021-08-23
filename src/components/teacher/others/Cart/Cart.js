import React,{useState, useEffect,useContext} from "react";
import "../../../../assets/css/teacher/cart.css";
import siparis1 from "../../../../assets/img/teacher/Orders/siparis1.jpg";
import siparis2 from "../../../../assets/img/teacher/Orders/siparis2.jpg";
import siparis3 from "../../../../assets/img/teacher/Orders/siparis3.jpg";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import {useHistory} from "react-router-dom"
import TeacherOperations from "../../../../logics/Teacher/TeacherOperations"
import { CartItemContext } from "../../TeacherLayout";


function Cart() {
  const history = useHistory();
  
  const [cart, setCart]= useState([]);
  
  const countContext = useContext(CartItemContext);
  const [summaryInfo, setInfo] = useState();

  useEffect(() => {
    var userId = TeacherOperations.getUserId();
    const storageCart = JSON.parse(localStorage.getItem("cart-"+userId));
    if(storageCart && storageCart.length > 0){
      var cartItems = storageCart.map(item => item.id);
      TeacherOperations.getCartItems(cartItems, (data) => {
        setCart(data);
        var info = 0;
        for(var i = 0; i < data.length; i++){
          var count = storageCart.filter(c => c.id == data[i].id)[0].count;
          info += data[i].price * count;
        }
        setInfo(info);
      });
    }
    
  }, [])

  const handleRemoveItem = (price, productId) => {
    if (cart && cart.length > 0) {
      var userId = TeacherOperations.getUserId();
      var index = cart.findIndex(p => p.id == productId);
     
      setCart(prev => {
        prev.splice(index, 1);
        return prev;
      });
      const storageCart = JSON.parse(localStorage.getItem("cart-"+userId));
      var indexStorage = storageCart.findIndex(p => p.id == productId);
      storageCart.splice(indexStorage,1);
      localStorage.setItem("cart-"+userId, JSON.stringify(storageCart));
      if (countContext.countState > 0) {
        countContext.countDispatch("decrement");
      }
      setInfo(prev => prev - price);
    }
  }
  

 const handleClickBackTrade = (e) => {
   e.preventDefault();
   history.push("/teacher/");
 }
 
  return (
    <div className="Cart">
      <div className="card mt-3">
        <div className="row">
          <div className="col-md-8 cart">
            <div className="title">
              <div className="row">
                <div className="col">
                  <h4>
                    <b>Sepetim</b>
                  </h4>
                </div>
                <div className="col align-self-center text-right text-muted">
                  {cart && cart.length + " ürün"} 
                </div>
              </div>
            </div>
            {cart && cart.map((product, index) => (
              <CartItem
              key={index}
              itemId={product.id}
              itemCategory={product.productCategory.categoryName}
              itemName={product.productName}
              itemPrice={product.price}
              itemSrc={product.images[0].url}
              handleRemoveItem = {handleRemoveItem}
              setInfo={setInfo}
            />
            ))}

            <div className="back-to-shop">
              <a href="#" onClick={handleClickBackTrade}>
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
                <span className="text-muted">Alışverişe devam et</span>
              </a>
            </div>
          </div>

          <CartSummary cart={cart} summaryInfo={summaryInfo} setCart={setCart} />
        </div>
      </div>
    </div>
  );
}

export default Cart;
