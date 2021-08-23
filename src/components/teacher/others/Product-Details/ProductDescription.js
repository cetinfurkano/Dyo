import React from "react";
import Bullet from "./Bullet";
import Store from "./Store";
function ProductDescription({product}) {
  console.log(product);
  return (
    <div className="product-description">
      <div className="d-flex flex-row align-items-center">
        <i className="fa fa-calendar-check-o"></i>
        <span className="ml-1">15-45 gün arasında teslim edilir.</span>
      </div>
      <div className="mt-2">
        <span className="font-weight-bold">Açıklama</span>
        <p>
          {product.productDescription}
        </p>
        <div className="bullets">
          <Bullet text={"Stoklarda şuan "+product.stockAmount + " adet mevcut."}/>
          {/* <Bullet text={}/>
          <Bullet text={}/>
          <Bullet text={}/>
          <Bullet text={}/> */}
        </div>
      </div>

      <Store distributorId={product.distributorId}/>
    </div>
  );
}

export default ProductDescription;
