import React, { useState, useEffect } from "react";
import Product from "../Product";
import Slider from "react-slick";
import TeacherOperations from "../../../../logics/Teacher/TeacherOperations";

function Related({ product }) {
  const [state, setState] = useState({ slideIndex: 0, updateCount: 0 });

  const [productRelateds, setRelateds] = useState();

  const settingsRelated = {
    infinite: true,
    centerMode: false,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    afterChange: () =>
      setState((state) => ({ ...state, updateCount: state.updateCount + 1 })),
    beforeChange: (current, next) => setState({ ...state, slideIndex: next }),
  };

  useEffect(() => {
    const options = {
      id: product.id,
      categoryName: product.productCategory.categoryName,
      distributorId: product.distributorId,
    };
    TeacherOperations.getRelatedProducts(options, (data) => {
      setRelateds(data);
    });
  }, []);

  return (
    <div className="container mt-2 d-inline">
      <h4>Related:</h4>
      <div className="row">
        <div className="col-md-12">
          <div className="owl-carousel">
            <Slider {...settingsRelated}>
              {productRelateds && productRelateds.map((related, index) => {
                <Product product={related} key={index}/>
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Related;
