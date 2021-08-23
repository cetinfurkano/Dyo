import React, { useState, useEffect } from "react";
import Product from "../Product";
import ProductCategories from "./ProductCategories";
import TeacherOperations from "../../../../logics/Teacher/TeacherOperations";
import useQuery from "../../../useQuery";

function Index() {
  const [products, setProducts] = useState([]);
  const query = useQuery();
  const searchText = query.get("productName");
  
  useEffect(() => {
   if(!searchText){
    TeacherOperations.getProducts((data) => {
      setProducts(data);
    });
   }
   else{
      TeacherOperations.getProductsBySearch(searchText, (data)=>{
        setProducts();
        setProducts(data);
      });
   }
  }, [searchText]);
  
  return (
    <>
      <div className="feature-heading">
        <h2>
          <strong>Kategoriler</strong>
        </h2>
      </div>
      <ProductCategories />
      <div className="container mt-3 p-3">
        <div className="row">
          {products &&
            products.map((product, index) => (
              <div className="col-lg-3 col-md-6 col-sm-12 mb-4 mb-lg-0 product-col" key={index}>
                <Product product={product} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Index;
