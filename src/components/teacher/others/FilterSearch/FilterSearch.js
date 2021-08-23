import React, { useState, useReducer,useEffect,useRef } from "react";
import Product from "../Product";
import "../../../../assets/css/teacher/filterSearch.css";
import Sidebar from "./Sidebar";
import { useRouteMatch, useParams } from "react-router-dom";
import TeacherOperations from "../../../../logics/Teacher/TeacherOperations";
import customCategories from "../../../GLOBAL_DATA.json";
import { useHistory } from "react-router-dom";

export const FilterObjectContext = React.createContext();

function FilterSearch() {
  var { category } = useParams();
  const history = useHistory();
  const filterItem = useRef({value:"", label:""});
  
  const [filterObject, setFilterObject]= useState({
    categoryName: "",
    branches: [],
    educationTypes:[],
    max: 200,
    min:0
  });
  useEffect(() => {
    var categoryRequest = customCategories.categoryNames.filter(
      (c) => c.value == category
    ); 
    if (categoryRequest.length > 0) {     
      filterItem.current.value=parseInt(categoryRequest[0].value);
      filterItem.current.label = categoryRequest[0].label;

      setFilterObject({...filterObject, categoryName:categoryRequest[0].label});
      
    } else {
      history.push("/error");
    }   
  }, []);
  
  const [products, setProducts] = useState([]);
  useEffect(() => {
    TeacherOperations.getProductsByFilters({...filterObject, categoryName: filterItem.current.label}, (data)=>{
      setProducts(data);
    });   
  }, [])

  const getFilteredProducts = (e) => {
    TeacherOperations.getProductsByFilters(filterObject, (data)=>{
      setProducts();
      setProducts(data);
    });
    
  }
  
  return (
   
      <div className="FilterSearch">
        <Sidebar
          category={category}
          filterObject={filterObject}
          filterItem={filterItem.current}
          setFilterObject={setFilterObject}
          getFilteredProducts={getFilteredProducts}
        />
        <div className="container p-3">
          <div className="d-flex flex-row">
            <div className="text-muted m-2" id="res">
              {products && products.length} sonuç gösteriliyor
            </div>
          </div>
          <div className="row">
            {products &&
              products.map((product, index) => (
                <div
                  key={index}
                  className="col-lg-4 col-md-6 col-sm-12 mb-4 mb-lg-0 product-col"
                >
                  <Product product={product} />
                </div>
              ))}
          </div>
        </div>
      </div>
    // </FilterObjectContext.Provider>
  );
}

export default FilterSearch;
