import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "../../assets/css/distributor/add-order-item.css";
import Select from "react-select";
import $ from "jquery";
import DistOperations from "../../logics/Distributor/DistOperations";

function AddOrderItems({ show, setModalShow, orderItems, setOrderItems,disabled }) {
  const [products, setProducts] = useState([]);
  const [itemInputs, setItemInputs] = useState([0]);
  const [test, setTest] = useState([]);

  useEffect(() => {
    DistOperations.getProducts((data) => {
      setProducts(data);
    });
  }, []);

  const handleChangeProduct = (e) => {
    var index = e.target.getAttribute("data-index");
    setOrderItems(prev => {
      const items = [...prev];
      items[index].productId = e.target.value;
      return items;
    });
  };

  const handleChangeQuantity = (e) => {
    var index = e.target.getAttribute("data-index");
    setOrderItems(prev => {
      const items = [...prev];
      items[index].count = parseInt(e.target.value);
      return items;
    });
  };

  const handleAddClick = (e) => {
    setOrderItems(prev => {
      const prevOrderItems = [...prev];
      prevOrderItems.push({productId: products[0].id, count: 1});
      return prevOrderItems;
    });
    console.log(orderItems);
  };

  const handleRemoveClick = (e) => {
    setOrderItems(prev => {
      const prevOrderItems = [...prev];
      prevOrderItems.pop();
      return prevOrderItems;
    });
  };

  const handleOKClick = (e) => {
    setModalShow(false);
  };

  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop={"static"}
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Sipariş Ürünleri
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {orderItems.length > 0 ? orderItems.map((item, index) => (
          <div className="PerformanceModal SelectOrderItem" key={index}>
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <div className="select">
                    <select
                      name="format"
                      onChange={handleChangeProduct}
                      data-index={index}
                      value={item.id}
                      disabled={disabled}
                    >
                      {products.map((p, i) => (
                        <option key={i} value={p.id}>
                          {p.productName} {"("+p.publisherName+")"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group row">
                    <label className="input">
                      <input
                        className="input__field"
                        type="number"
                        placeholder=" "
                        data-index={index}
                        value={item.quantity}
                        onChange={handleChangeQuantity}
                        disabled={disabled}
                      />
                      <span className="input__label">Ürün Adeti</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <input
              type="hidden"
              data-selected={products.length > 0 ? products[0].id : ""}
              data-quantity="1"
              disabled={disabled}
              // data-selector={item}
            />
          </div>
        )): ""}
        <div className="addRemove">
          <button
            type="button"
            className="btn btn-success"
            onClick={handleAddClick}
            disabled={disabled}
          >
            Ekle
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleRemoveClick}
            disabled={disabled}
          >
            Sil
          </button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleOKClick}>Tamam</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddOrderItems;
