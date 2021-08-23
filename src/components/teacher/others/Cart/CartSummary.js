import React,{useContext} from "react";
import TeacherOperations from "../../../../logics/Teacher/TeacherOperations";
import {useHistory} from "react-router-dom";
import { CartItemContext } from "../../TeacherLayout";

function CartSummary({ cart, summaryInfo, setCart }) {
  const history= useHistory();

  const countContext = useContext(CartItemContext);

  const handleOkClick = (e) => {
    var orderItems = JSON.parse(
      localStorage.getItem("cart-" + TeacherOperations.getUserId())
    );
    TeacherOperations.toOrder(orderItems, (data) => {
      orderItems = [];
      localStorage.setItem("cart-"+ TeacherOperations.getUserId(), JSON.stringify(orderItems));
      history.push("/teacher/");
      countContext.countDispatch("reset");
    });
  };

  return (
    <div className="col-md-4 summary">
      <div>
        <h5>
          <b>Özet</b>
        </h5>
      </div>
      <hr />
      <div className="row">
        <div className="col" style={{ paddingLeft: "0" }}>
          {cart && cart.length} ÜRÜN
        </div>
        <div className="col text-right">
          {summaryInfo} <i className="fa fa-try" aria-hidden="true"></i>
        </div>
      </div>
      <form>
        <p>KARGO</p>
        <select>
          <option className="text-muted">Standart Teslimat-5₺</option>
        </select>
        <p>İNDİRİM KODU</p>
        <input id="code" placeholder="İndirim kodunuzu girin" />
      </form>
      <div
        className="row"
        style={{
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          padding: "2vh 0",
        }}
      >
        <div className="col">Toplam Tutar</div>
        <div className="col text-right">
          {summaryInfo} <i className="fa fa-try" aria-hidden="true"></i>
        </div>
      </div>
      <button type="button" className="btn" onClick={handleOkClick}>
        Tamamla
      </button>
    </div>
  );
}

export default CartSummary;
