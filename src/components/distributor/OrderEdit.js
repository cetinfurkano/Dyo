import React, { useState } from "react";
import DistOperations from "../../logics/Distributor/DistOperations";
import FormModal from "./FormModal";
import AddOrderItems from "./AddOrderItems";
import getDateFormat from "../../logics/DateFormat";
import Select from "react-select";
import GLOBAL_DATA from "../GLOBAL_DATA.json"

function OrderEdit({ row }) {
  const [order, setOrder] = useState(row);
  const [show, setShow] = useState(false);
  const [showEdit, setEditModalShow] = useState(false);
  const [showView, setViewModalShow] = useState(false);

  console.log(order.isValid);

  const handleClickEdit = (e) => {
    setEditModalShow(true);
  };
  const handleClickView = (e) => {
    setViewModalShow(true);
  };
  const handleCloseView = (e) => {
    setViewModalShow(false);
  };
  const handleOrderItems = (e) => {
    setShow(true);
  };

  const handleOrderState = (selected) => {
    order.orderState = parseInt(selected.value);
  }

  const handleUpdateHandler = (e) => {
    DistOperations.updateOrder({
      id: order.id,
      orderState: order.orderState,
      isValid: order.isValid
    });
  }
  

  

  return (
    <div className="dropdown d-inline">
      <button
        type="button"
        className="btn"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fa fa-pencil-square-o"></i>
      </button>
      <div
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="dropdownMenuButton"
      >
        <a className="dropdown-item" href="#" onClick={handleClickEdit}>
          <i className="fa fa-pencil" aria-hidden="true"></i>
          Güncelle
        </a>
        <a className="dropdown-item" href="#" onClick={handleClickView}>
          <i className="fas fa-eye" aria-hidden="true"></i>
          Görüntüle
        </a>
      </div>

      <FormModal
        registerText="Siparişi Güncelle"
        show={showEdit}
        setModalShow={setEditModalShow}
      >
        <div className="DistInput">
          <div className="dist_input_container">
            <div className="title">Siparişi Güncelle</div>
            <div className="content">
              <form action="#">
              <div className="input-box">
                <span className="details">Kategoriler</span>
                <Select
                  options={GLOBAL_DATA.orderStates}
                  onChange={handleOrderState}
                  id="test"
                />
              </div>

                <div className="valid-details">
                  <input
                    type="radio"
                    name="valid"
                    id="dot-1"
                    checked={order.isValid}
                    onChange={(e) => setOrder({ ...order, isValid: true })}
                  />
                  <input
                    type="radio"
                    name="valid"
                    id="dot-2"
                    checked={!order.isValid}
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
                  <input
                    type="submit"
                    value="Güncelle"
                    onClick={handleUpdateHandler}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </FormModal>

      <FormModal
        registerText="Siparişi Görüntüle"
        show={showView}
        setModalShow={setViewModalShow}
      >
        <div className="DistInput">
          <div className="dist_input_container">
            <div className="title">Siparişini Görüntüleme!</div>
            <div className="content">
              <form action="#">
                <div className="dist-details">
                  <div className="input-box">
                    <span className="details">Öğretmen ID</span>
                    <input
                      type="text"
                      placeholder="Öğretmen ID' sini girin."
                      required
                      disabled="true"
                      defaultValue={order.teacher.id}
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Sipariş Adresi</span>
                    <textarea
                      rows="5"
                      cols="40"
                      placeholder="Sipariş adresini girin."
                      disabled="true"
                      defaultValue={order.address.addressDescription}
                    ></textarea>
                  </div>
                  <div className="input-box">
                    <span className="details">Şehir Bilgisi</span>
                    <input
                      type="text"
                      placeholder="Sipariş hangi şehre?"
                      required
                      disabled="true"
                      defaultValue={order.address.city}
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">İlçe Bilgisi</span>
                    <input
                      type="text"
                      placeholder="Sipariş hangi ilçeye?"
                      required
                      disabled="true"
                      defaultValue={order.address.district}
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Sipariş Tarihi</span>
                    <input
                      type="date"
                      placeholder="Sipariş tarihini girin."
                      required
                      disabled="true"
                      defaultValue={getDateFormat(order.startDate, 0)}
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Sipariş Bitiş Tarihi</span>
                    <input
                      type="date"
                      placeholder="Sipariş bitiş tarihi."
                      required
                      disabled="true"
                      defaultValue={getDateFormat(order.dueDate, 0)}
                    />
                  </div>
                  <div className="input-box">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleOrderItems}
                    >
                      Sipariş Ürünleri
                    </button>
                  </div>
                </div>
                <div className="valid-details">
                  <input
                    type="radio"
                    name="valid"
                    id="dot-1"
                    checked={order.isValid}
                    disabled="true"
                  />
                  <input
                    type="radio"
                    name="valid"
                    id="dot-2"
                    disabled="true"
                    checked={!order.isValid}
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
                  <input
                    type="submit"
                    value="Tamam"
                    onClick={handleCloseView}
                  />
                </div>
              </form>
            </div>
            <AddOrderItems
              show={show}
              setModalShow={setShow}
              orderItems={order.items.map((item) => {
                return {
                  quantity: item.count,
                  id: item.product.id,
                };
              })}
              disabled={true}
            />
          </div>
        </div>
      </FormModal>
    </div>
  );
}

export default OrderEdit;
