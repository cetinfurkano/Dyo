import React, { useState } from "react";
import Slider from "react-slick";

function ProductImages({ images }) {
  const baseURL = "https://i.imgur.com/";
  const URLs = ["DhKkTrG.jpg", "KZpuufK.jpg", "c9uUysL.jpg", "kYWqL7k.jpg"];
  const settingsToDetailSlider = {
    customPaging: function (i) {
      return (
        <a>
          <img src={images[i].url} />
        </a>
      );
    },
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="card">
      <div className="demo">
        <ul id="lightSlider">
          <Slider {...settingsToDetailSlider}>
            {images && images.map((image, index) => (
              <li key={index}>
                <img src={image.url} />
              </li>
            ))}
          </Slider>
        </ul>
      </div>
    </div>
  );
}

export default ProductImages;
