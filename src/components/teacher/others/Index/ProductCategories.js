import React from "react";
import ProductCategory from "./ProductCategory";
import CizgiRoman from "../../../../assets/img/teacher/ProductCategories/cizgi_roman.webp";
import Roman from "../../../../assets/img/teacher/ProductCategories/roman.jpg";
import Test from "../../../../assets/img/teacher/ProductCategories/test.jpg";
import Kpss from "../../../../assets/img/teacher/ProductCategories/kpss.png";
import Deneme from "../../../../assets/img/teacher/ProductCategories/deneme.jpg";
import {Link} from "react-router-dom"

function ProductCategories() {
  //burası foreach ile dönülecek

  return (
    <ul id="autoWidth" className="container pl-5" className="cs-hidden">
      <Link to="/teacher/filterSearch/1" src={Deneme} title="Deneme Sınavları" component={ProductCategory} /> 
      <Link to="/teacher/filterSearch/2" src={Test} title="Test Kitapları" component={ProductCategory} /> 
      <Link to="/teacher/filterSearch/3" src={Roman} title="Romanlar" component={ProductCategory} /> 
      <Link to="/teacher/filterSearch/4" src={CizgiRoman} title="Çizgi Romanlar" component={ProductCategory} /> 
      <Link to="/teacher/filterSearch/5" src={Kpss} title="Sınava Hazırlık" component={ProductCategory} /> 
    </ul>
  );
}

export default ProductCategories;
