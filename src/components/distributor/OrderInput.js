import React, { useState,useRef,useEffect } from "react";
import "../../assets/css/distributor/dist-input.css";
import GLOBAL_DATA from "../GLOBAL_DATA.json";
import Select from "react-select";
import DistOperations from "../../logics/Distributor/DistOperations";
import AddOrderItems from "./AddOrderItems";

function OrderInput({ setOrders,setParentModalShow }) {
  const [order, setOrder] = useState({ isValid: false });
  const [orderItems, setOrderItems] = useState([])
  
  const [show, setShow] = useState(false);

  const handleChangeOrderState = (selected) => {
    setOrder({ ...order, orderState: parseInt(selected.value) });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    order.items = orderItems;
    DistOperations.addOrder(order, (data) => {   
      setOrders(prev => {
        const prevOrders = [...prev];
        console.log(data);
        prevOrders.push(data);
        return prevOrders;
      });
    });
    setParentModalShow(false);
  };


  const handleOrderItems = (e) => {
    setShow(true);
  }

  return (
    <div className="DistInput">
      <div className="dist_input_container">
        <div className="title">Siparişini Hızlıca Kaydet!</div>
        <div className="content">
          <form action="#">
            <div className="dist-details">
              <div className="input-box">
                <span className="details">Öğretmen ID</span>
                <input
                  type="text"
                  placeholder="Öğretmen ID' sini girin."
                  required
                  onChange={(e) =>
                    setOrder({ ...order, teacherId: e.target.value })
                  }
                />
              </div>
              <div className="input-box">
                <span className="details">Sipariş Adresi</span>
                <textarea
                  rows="5"
                  cols="40"
                  placeholder="Sipariş adresini girin."
                  onChange={(e) => {
                    const address = { ...order.address };
                    address.addressDescription = e.target.value;
                    setOrder({ ...order, address: address });
                  }}
                ></textarea>
              </div>
              <div className="input-box">
                <span className="details">Şehir Bilgisi</span>
                <input
                  type="text"
                  placeholder="Sipariş hangi şehre?"
                  required
                  onChange={(e) => {
                    const address = { ...order.address };
                    address.city = e.target.value;
                    setOrder({ ...order, address: address });
                  }}
                />
              </div>
              <div className="input-box">
                <span className="details">İlçe Bilgisi</span>
                <input
                  type="text"
                  placeholder="Sipariş hangi ilçeye?"
                  required
                  onChange={(e) => {
                    const address = { ...order.address };
                    address.district = e.target.value;
                    setOrder({ ...order, address: address });
                  }}
                />
              </div>
              <div className="input-box">
                <span className="details">Sipariş Tarihi</span>
                <input
                  type="date"
                  placeholder="Sipariş tarihini girin."
                  required
                  onChange={(e) =>
                    setOrder({ ...order, startDate: new Date(e.target.value) })
                  }
                />
              </div>
            <div className="input-box">
              <button type="button" className="btn btn-primary" onClick={handleOrderItems}>Sipariş Ürünleri</button>
            </div>
      
            </div>
            <div className="valid-details">
              <input
                type="radio"
                name="valid"
                id="dot-1"
                onChange={(e) => setOrder({ ...order, isValid: true })}
              />
              <input
                type="radio"
                name="valid"
                id="dot-2"
                onChange={(e) => setOrder({ ...order, isValid: false })}
              />
              <span className="valid-title">Aktif Mi?</span>
              <div className="category">
                <label htmlFor="dot-1">
                  <span className="dot one"></span>
                  <span className="valid">Aktif</span>
                </label>
                <label htmlFor="dot-2">
                  <span className="dot two"></span>
                  <span className="valid">Pasif</span>
                </label>
              </div>
            </div>
            <div className="button">
              <input type="submit" value="Kaydet" onClick={handleSubmit} />
            </div>
          </form>
        </div>
       <AddOrderItems show={show} setModalShow={setShow} orderItems={orderItems} setOrderItems={setOrderItems} /> 
      </div>
    </div>
  );
}

export default OrderInput;
