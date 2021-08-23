import React, { useState, useEffect } from "react";
import "../../../../assets/css/teacher/order-tracking.css";
import siparis1 from "../../../../assets/img/teacher/Orders/siparis1.jpg";
import siparis2 from "../../../../assets/img/teacher/Orders/siparis2.jpg";
import { Link, useParams, useHistory } from "react-router-dom";
import TeacherOperations from "../../../../logics/Teacher/TeacherOperations";
import getDateFormat from "../../../../logics/DateFormat";
import TrackingItem from "./TrackingItem";
import globalData from "../../../GLOBAL_DATA.json";
function OrderTracking() {
  var { orderId } = useParams();
  const [order, setOrder] = useState();

  const history = useHistory();

  useEffect(() => {
    TeacherOperations.getOrder(orderId, (data) => {
      setOrder(data);
    });
  }, []);

  const handleClickBackToOrders = (e) => {
    e.preventDefault();
    history.push("/teacher/orders");
  };
  
  const getAccepted = () => {
    switch(order.orderState){
      case 0:
      case 1:
      case 2:
      case 4:
      case 5:
        return "active";
      default: return "";
    }
  }

  const getShipping = () => {
    switch(order.orderState){
      case 1:
      case 2:
      case 4: 
        return "active";
      default: return "";
    }
  }
  const getOnTheWay = () => {
    switch(order.orderState){
      case 1:
      case 2:
        return "active";
      default: return "";
    }
  }
  const getDone = () => {
    return order.orderState == 1 ? "active":"";
  }
  

  return (
    <div className="OrderTracking">
      <div className="container">
        <article className="card">
          <header className="card-header">Siparişlerim / Takip</header>
          <div className="card-body">
            <h6>Sipariş ID: {order && order.id}</h6>
            <article className="card">
              <div className="card-body row">
                <div className="col">
                  <strong>Tahmini Varış Zamanı:</strong> <br />
                  {getDateFormat(new Date().toString(), 1)}
                </div>
                <div className="col">
                  <strong>Kargolandı:</strong> <br />
                  BLUEDART, | <i className="fa fa-phone"></i>{" "}
                  {order && order.distributor.phoneNumber}
                </div>
                <div className="col">
                  <strong>Durum:</strong> <br />
                  {order && globalData.orderStates.filter(s => s.value == order.orderState.toString())[0].label}
                </div>
                <div className="col">
                  <strong>Takip No #:</strong> <br />
                  BD045903594059
                </div>
              </div>
            </article>
            <div className="track">
              <div className={order && "step "+getAccepted()}>
                <span className="icon">
                  {" "}
                  <i className="fa fa-check"></i>{" "}
                </span>
                <span className="text">Kabul Edildi</span>
              </div>
              <div className={order && "step "+getShipping()}>
                <span className="icon">
                  {" "}
                  <i className="fa fa-user"></i>{" "}
                </span>
                <span className="text">Kargoya Verildi</span>
              </div>
              <div className={order && "step "+getOnTheWay()}>
                <span className="icon">
                  {" "}
                  <i className="fa fa-truck"></i>{" "}
                </span>
                <span className="text"> Yolda </span>
              </div>
              <div className={order && "step "+getDone()}>
                <span className="icon">
                  {" "}
                  <i className="fa fa-box"></i>{" "}
                </span>
                <span className="text">Teslim Edildi</span>
              </div>
            </div>
            <hr />
            <ul className="row">
              {order &&
                order.items.map((item, index) => (
                  <TrackingItem product={item.product} key={index} />
                ))}
            </ul>
            <hr />
            <a
              href="#"
              className="btn btn-warning"
              data-abc="true"
              onClick={handleClickBackToOrders}
            >
              <i className="fa fa-chevron-left"></i> Siparişlere Geri Dön
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}

export default OrderTracking;
