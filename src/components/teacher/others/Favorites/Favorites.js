import React, { useState, useEffect } from "react";
import Product from "../Product";
import TeacherOperations from "../../../../logics/Teacher/TeacherOperations";

function Favorites() {
  const [favorites, setFavorites] = useState();

  useEffect(() => {
    var userId = TeacherOperations.getUserId();
    const storageFavorites = JSON.parse(
      localStorage.getItem("favor-" + userId)
    );
    if (storageFavorites && storageFavorites.length > 0) {
      TeacherOperations.getFavorites(storageFavorites, (data) => {
        setFavorites(data);
      });
    }
  }, []);

  console.log(favorites);
  return (
    <div className="container mt-2 p-3">
      <div className="row">
        <div className="col-12">
          <h3 style={{ color: "red" }}>
            Favori Ürünlerin <i className="fa fa-heart" aria-hidden="true"></i>
          </h3>
        </div>
        <div className="col-12">
          <p>Favorilerine aldığın ürünler tükenmeden sen tüket!</p>
        </div>
      </div>
      <div className="row">
        {favorites &&
          favorites.map((favorited, index) => (
            <div className="col-lg-3 col-md-6 col-sm-12 mb-4 mb-lg-0 product-col">
              <Product product={favorited} key={index} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Favorites;
