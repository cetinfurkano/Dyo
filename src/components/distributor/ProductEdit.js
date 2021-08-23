import React, { useState, useEffect } from "react";
import Select from "react-select";
import FormModal from "./FormModal";

import GLOBAL_DATA from "../GLOBAL_DATA.json";
import DistOperations from "../../logics/Distributor/DistOperations";
import AddProductImageModal from "./AddProductImageModal";

function ProductEdit({ row }) {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState(row);

  const [showImages, setShowImage] = useState(false);

  const [productImages, setProductImages] = useState(row.images);

  const handleRemoveClick = (e) => {
    DistOperations.removeProduct(product);
  };
  const handleEditClick = (e) => {
    setShow(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    for (var i = 0; i < productImages.length; i++) {
      if (productImages[i].url) {
        continue;
      }
      formData.append("files", productImages[i]);
    }
    DistOperations.updateProduct(product, formData);
  };

  const handleChangeSubCategories = (selected) => {
    var productCategory = { ...product.productCategory };
    productCategory.branch = parseInt(selected.value);
    setProduct({ ...product, productCategory: productCategory });
  };
  const handleChangeCategoryName = (selected) => {
    var productCategory = { ...product.productCategory };
    productCategory.categoryName = selected.label;
    setProduct({ ...product, productCategory: productCategory });
  };
  const handleChangeTypeOfEducation = (selected) => {
    var productCategory = { ...product.productCategory };
    productCategory.typeOfEducation = parseInt(selected.value);
    setProduct({ ...product, productCategory: productCategory });
  };

  return (
    <div className="ProductEdit">
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
          <a className="dropdown-item" href="#" onClick={handleRemoveClick}>
            <i className="fa fa-trash"></i> Sil
          </a>
          <a className="dropdown-item" href="#" onClick={handleEditClick}>
            <i className="fa fa-pencil"></i> Düzenle
          </a>
        </div>
      </div>
      <FormModal show={show} setModalShow={setShow} registerText={"Güncelle"}>
        <div className="DistInput">
          <div className="dist_input_container">
            <div className="title">Ürününü Hızlıca Güncelle!</div>
            <div className="content">
              <form action="#">
                <div className="dist-details">
                  <div className="input-box">
                    <span className="details">Ürün ID</span>
                    <input
                      type="text"
                      required
                      readOnly
                      defaultValue={product.id}
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Yayınevi</span>
                    <input
                      type="text"
                      placeholder="Kitabın yayınevini girin."
                      required
                      value={product.publisherName}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          publisherName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Ürün Açıklaması</span>
                    <textarea
                      rows="5"
                      cols="40"
                      placeholder="Ürün açıklamasını girin."
                      value={product.productDescription}
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
                      value={product.productName}
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
                      value={product.price}
                      required
                      onChange={(e) => {
                        const regexp = /^[0-9\b]+$/;
                        if (
                          e.target.value === "" ||
                          regexp.test(e.target.value)
                        )
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
                      value={product.stockAmount}
                      onChange={(e) => {
                        const regexp = /^[0-9\b]+$/;
                        if (
                          e.target.value === "" ||
                          regexp.test(e.target.value)
                        )
                          setProduct({
                            ...product,
                            stockAmount:
                              e.target.value !== ""
                                ? parseInt(e.target.value)
                                : 0,
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
                      value={product.discount}
                      onChange={(e) => {
                        const regexp = /^[0-9\b]+$/;
                        if (
                          e.target.value === "" ||
                          regexp.test(e.target.value)
                        )
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
                      defaultValue={
                        GLOBAL_DATA.categoryNames.filter(
                          (c) => c.label == product.productCategory.categoryName
                        )[0]
                      }
                      options={GLOBAL_DATA.categoryNames}
                      onChange={handleChangeCategoryName}
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Alt Kategoriler</span>
                    <Select
                      options={
                        product.productCategory != null &&
                        (product.productCategory.categoryName === "Romanlar" ||
                          product.productCategory.categoryName ===
                            "Çizgi Romanlar")
                          ? GLOBAL_DATA.novelCategories
                          : GLOBAL_DATA.subCategories
                      }
                      defaultValue={
            
                        product.productCategory != null &&
                        (product.productCategory.categoryName === "Romanlar" ||
                          product.productCategory.categoryName ===
                            "Çizgi Romanlar")
                          ? GLOBAL_DATA.novelCategories.filter(
                              (c) =>
                                c.value ==
                                product.productCategory.branch
                            )[0]
                          : GLOBAL_DATA.subCategories.filter(
                              (c) =>
                                c.value ==
                                product.productCategory.branch
                            )[0]
                      }
                      
                      onChange={handleChangeSubCategories}
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Eğitim Türü</span>
                    <Select
                      defaultValue={
                        GLOBAL_DATA.educationTypes.filter(
                          (c) =>
                            c.value ==
                            product.productCategory.typeOfEducation.toString()
                        )[0]
                      }
                      isDisabled={
                        product.productCategory != null &&
                        (product.productCategory.categoryName === "Romanlar" ||
                          product.productCategory.categoryName ===
                            "Çizgi Romanlar")
                      }
                      options={GLOBAL_DATA.educationTypes}
                      onChange={handleChangeTypeOfEducation}
                    />
                  </div>
                  <div className="input-box">
                    <span className="details">Ürün Maliyeti</span>
                    <input
                      type="text"
                      placeholder="Ürün maliyetini girin"
                      required
                      value={product.cost}
                      onChange={(e) => {
                        const regexp = /^[0-9\b]+$/;
                        if (
                          e.target.value === "" ||
                          regexp.test(e.target.value)
                        )
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
                <div className="input-box">
                  <span className="details">Ürün Resimleri</span>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={(e) => setShowImage(true)}
                  >
                    Resim Ekle
                  </button>
                </div>
                <div className="valid-details">
                  <input
                    type="radio"
                    name="valid"
                    id="dot-1"
                    checked={product.isValid}
                    onChange={(e) => setProduct({ ...product, isValid: true })}
                  />
                  <input
                    type="radio"
                    name="valid"
                    id="dot-2"
                    checked={!product.isValid}
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
                  <input
                    type="submit"
                    value="Güncelle"
                    onClick={handleSubmit}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </FormModal>
      <AddProductImageModal
        show={showImages}
        setModalShow={setShowImage}
        images={product.images}
        setProductImages={setProductImages}
      />
    </div>
  );
}

export default ProductEdit;
