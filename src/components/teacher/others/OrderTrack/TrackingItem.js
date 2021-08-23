import React from "react";
import {useHistory} from "react-router-dom";

function TrackingItem({product}) {
    const history = useHistory();

    const handleClick = (e) => {
        history.push("/teacher/productDetails/"+product.id);
    }
    

  return (
    <li className="col-md-4" onClick={handleClick}>
      <figure className="itemside mb-3">
        <div className="aside">
          <img src={product.images[0].url} className="img-sm border" />
        </div>
        <figcaption className="info align-self-center">
          <p className="product-title">
           {product.productName} <br />
            {product.productCategory.categoryName}
          </p>
          <span className="text-muted">{product.price} ₺ </span>
        </figcaption>
      </figure>
    </li>
  );
}



export default TrackingItem;
