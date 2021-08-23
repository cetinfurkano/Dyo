import React, { useState, useRef } from "react";
import "../../assets/css/distributor/dist-input.css";
import Select from "react-select";
import GLOBAL_DATA from "../GLOBAL_DATA.json";
import DistOperations from "../../logics/Distributor/DistOperations";

function ProductInput({ setModalShow,setProducts }) {
  const [product, setProduct] = useState({ isValid: false });

  //const [selectedValue, setSlectedValue] = useState();
  const handleChangeCategoryName = (selected) => {
    console.log(selected);
    var productCategory = { ...product.productCategory };
    productCategory.categoryName = selected.label;
    setProduct({ ...product, productCategory: productCategory });
  };
  const handleChangeSubCategories = (selected) => {
    var productCategory = { ...product.productCategory };
    if(productCategory.categoryName == "Romanlar" || productCategory.categoryName == "Çizgi Romanlar"){
      productCategory.branch = parseInt(selected.value);
    }else{
      productCategory.branch = parseInt(selected.value);
    }
    setProduct({ ...product, productCategory: productCategory });
  };
  const handleChangeTypeOfEducation = (selected) => {
    var productCategory = { ...product.productCategory };
    productCategory.typeOfEducation = parseInt(selected.value);
    setProduct({ ...product, productCategory: productCategory });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    DistOperations.addProduct(product, (data) => {
      setProducts(prevProducts => {
        const copyOfProducts = [...prevProducts];
        copyOfProducts.push(data);
        return copyOfProducts;
      });
      setModalShow(false);
    });
  };

  return (
    <div className="DistInput">
      <div className="dist_input_container">
        <div className="title">Ürününü Hızlıca Kaydet!</div>
        <div className="content">
          <form action="#">
            <div className="dist-details">
              <div className="input-box">
                <span className="details">Yayınevi</span>
                <input
                  type="text"
                  placeholder="Kitabın yayınevini girin."
                  required
                  onChange={(e) =>
                    setProduct({ ...product, publisherName: e.target.value })
                  }
                />
              </div>
              <div className="input-box">
                <span className="details">Ürün Açıklaması</span>
                <textarea
                  rows="5"
                  cols="40"
                  placeholder="Ürün açıklamasını girin."
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      productDescription: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="input-box">
                <span className="details">Ürün İsmi</span>
                <input
                  type="text"
                  placeholder="Ürünün ismini belirtin."
                  required
                  onChange={(e) =>
                    setProduct({ ...product, productName: e.target.value })
                  }
                />
              </div>
              <div className="input-box">
                <span className="details">Ürün Fiyatı</span>
                <input
                  type="text"
                  placeholder="Ürün fiyatını girin."
                  required
                  onChange={(e) => {
                    const regexp = /^[0-9\b]+$/;
                    if (e.target.value === "" || regexp.test(e.target.value))
                      setProduct({
                        ...product,
                        price:
                          e.target.value !== ""
                            ? parseFloat(e.target.value)
                            : 0,
                      });
                  }}
                />
              </div>
              <div className="input-box">
                <span className="details">Stok Miktarı</span>
                <input
                  type="text"
                  placeholder="Stok miktarını girin."
                  required
                  onChange={(e) => {
                    const regexp = /^[0-9\b]+$/;
                    if (e.target.value === "" || regexp.test(e.target.value))
                      setProduct({
                        ...product,
                        stockAmount:
                          e.target.value !== "" ? parseInt(e.target.value) : 0,
                      });
                  }}
                />
              </div>
              <div className="input-box">
                <span className="details">İskonto Miktarı</span>
                <input
                  type="text"
                  placeholder="İskonto miktarını girin."
                  required
                  onChange={(e) => {
                    const regexp = /^[0-9\b]+$/;
                    if (e.target.value === "" || regexp.test(e.target.value))
                      setProduct({
                        ...product,
                        discount:
                          e.target.value !== ""
                            ? parseFloat(e.target.value)
                            : 0,
                      });
                  }}
                />
              </div>
              <div className="input-box">
                <span className="details">Kategoriler</span>
                <Select
                  options={GLOBAL_DATA.categoryNames}
                  onChange={handleChangeCategoryName}
                  id="test"
                />
              </div>
              <div className="input-box">
                <span className="details">Alt Kategoriler</span>
                <Select
                  options={
                    product.productCategory != null &&
                    (product.productCategory.categoryName === "Romanlar" ||
                      product.productCategory.categoryName === "Çizgi Romanlar") ? 
                    GLOBAL_DATA.novelCategories : GLOBAL_DATA.subCategories
                  }
                
                  onChange={handleChangeSubCategories}
                />
              </div>
              <div className="input-box">
                <span className="details">Eğitim Türü</span>
                <Select
                  options={GLOBAL_DATA.educationTypes}
                  onChange={handleChangeTypeOfEducation}
                  isDisabled={
                    product.productCategory != null &&
                    (product.productCategory.categoryName === "Romanlar" ||
                      product.productCategory.categoryName === "Çizgi Romanlar")
                  }
                />
              </div>
              <div className="input-box">
                <span className="details">Ürün Maliyeti</span>
                <input
                  type="text"
                  placeholder="Ürün maliyetini girin"
                  required
                  onChange={(e) => {
                    const regexp = /^[0-9\b]+$/;
                    if (e.target.value === "" || regexp.test(e.target.value))
                      setProduct({
                        ...product,
                        cost:
                          e.target.value !== ""
                            ? parseFloat(e.target.value)
                            : 0,
                      });
                  }}
                />
              </div>
            </div>
            <div className="valid-details">
              <input
                type="radio"
                name="valid"
                id="dot-1"
                onChange={(e) => setProduct({ ...product, isValid: true })}
              />
              <input
                type="radio"
                name="valid"
                id="dot-2"
                onChange={(e) => setProduct({ ...product, isValid: false })}
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
      </div>
    </div>
  );
}

export default ProductInput;
