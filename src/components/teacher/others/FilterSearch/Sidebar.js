import React, { useEffect, useState, useRef, useContext } from "react";
import {
  getLeftValue,
  getRightValue,
} from "../../../../assets/js/Teacher/SidebarControls";
import customCategories from "../../../GLOBAL_DATA.json";
import TeacherOperations from "../../../../logics/Teacher/TeacherOperations";
import { useHistory } from "react-router-dom";
import NovelFilter from "./NovelFilter";
import NovelSubCategories from "./NovelSubCategories";
import BranchFilter from "./BranchFilter";
import BranchSubcategories from "./BranchSubcategories";
import { FilterObjectContext } from "./FilterSearch";

function Sidebar({ category,filterObject, setFilterObject, filterItem, getFilteredProducts }) {
 
  const filterContext = useContext(FilterObjectContext);
  const history = useHistory();
  
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const sectionRef = useRef(null);
  const inputLeft = useRef(null);
  const inputRight = useRef(null);
  const thumbLeft = useRef(null);
  const thumbRight = useRef(null);
  const amountLeft = useRef(null);
  const amountRight = useRef(null);
  const range = useRef(null);

  function setLeftValue() {
    let leftValue = getLeftValue(inputLeft.current, inputRight.current);
    thumbLeft.current.style.left = leftValue + "%";
    range.current.style.left = leftValue + "%";
    amountLeft.current.innerText = parseInt(leftValue * 2);
    console.log(leftValue * 2.0);
    setFilterObject(prev => {
      prev.min = leftValue * 2;
      return prev;
    });
  }
  function setRightValue() {
    let rightValue = getRightValue(inputRight.current, inputLeft.current);
    amountRight.current.innerText = parseInt(rightValue * 2);
    thumbRight.current.style.right = 100 - rightValue + "%";
    range.current.style.right = 100 - rightValue + "%";
    setFilterObject(prev => {
      prev.max = rightValue * 2;
      return prev;
    });
  }

  function inputLeftMouseOver() {
    thumbLeft.current.classList.add("hover");
  }
  function inputLeftMouseOut() {
    thumbLeft.current.classList.remove("hover");
  }
  function inputLeftMouseDown() {
    thumbLeft.current.classList.add("active");
  }
  function inputLeftMouseUp() {
    thumbLeft.current.classList.remove("active");
  }

  function inputRightMouseOver() {
    thumbRight.current.classList.add("hover");
  }
  function inputRightMouseOut() {
    thumbRight.current.classList.remove("hover");
  }
  function inputRightMouseDown() {
    thumbRight.current.classList.add("active");
  }
  function inputRightMouseUp() {
    thumbRight.current.classList.remove("active");
  }

  useEffect(() => {
    const inputLeftInstance = inputLeft.current;
    const inputRightInstance = inputRight.current;
    setLeftValue();
    setRightValue();
    inputLeftInstance.addEventListener("input", setLeftValue);
    inputRightInstance.addEventListener("input", setRightValue);

    inputLeftInstance.addEventListener("mouseover", inputLeftMouseOver);
    inputLeftInstance.addEventListener("mouseout", inputLeftMouseOut);
    inputLeftInstance.addEventListener("mousedown", inputLeftMouseDown);

    inputLeftInstance.addEventListener("mouseup", inputLeftMouseUp);

    inputRightInstance.addEventListener("mouseover", inputRightMouseOver);
    inputRightInstance.addEventListener("mouseout", inputRightMouseOut);
    inputRightInstance.addEventListener("mousedown", inputRightMouseDown);
    inputRightInstance.addEventListener("mouseup", inputRightMouseUp);

    return () => {
      inputLeftInstance.removeEventListener("input", setLeftValue);
      inputRightInstance.removeEventListener("input", setRightValue);

      inputLeftInstance.removeEventListener("mouseover", inputLeftMouseOver);
      inputLeftInstance.removeEventListener("mouseout", inputLeftMouseOut);
      inputLeftInstance.removeEventListener("mousedown", inputLeftMouseDown);

      inputLeftInstance.removeEventListener("mouseup", inputLeftMouseUp);

      inputRightInstance.removeEventListener("mouseover", inputRightMouseOver);
      inputRightInstance.removeEventListener("mouseout", inputRightMouseOut);
      inputRightInstance.removeEventListener("mousedown", inputRightMouseDown);
      inputRightInstance.removeEventListener("mouseup", inputRightMouseUp);
    };
  }, []);

  useEffect(() => {
    if (dimensions.width < 575) {
      sectionRef.current.classList.add("collapse");
    } else {
      sectionRef.current.classList.remove("collapse");
    }

    function handleResize(event) {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
      //console.log(sectionRef.current.classList);
      if (dimensions.width < 575) {
        sectionRef.current.classList.add("collapse");
      } else {
        sectionRef.current.classList.remove("collapse");
      }
    }

    window.addEventListener("resize", handleResize);

    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div className="filter">
        <button
          className="btn btn-default"
          type="button"
          data-toggle="collapse"
          data-target="#sidebar"
          aria-expanded="true"
          aria-controls="sidebar"
        >
          Filtreler<span className="fa fa-filter pl-1"></span>
        </button>
      </div>
      <section ref={sectionRef} id="sidebar">
        <p>
          Dyo | <b>Filtrele</b>
        </p>
        <div className="border-bottom pb-2 ml-2">
          <h4 id="burgundy">Filtreler | {filterItem && filterItem.label}</h4>
        </div>
        <div className="py-2 border-bottom ml-3">
          <h6 className="font-weight-bold">Kategoriler</h6>
          <div id="orange">
            <span className="fa fa-minus"></span>
          </div>
          {filterItem && ((filterItem.value != 3) && (filterItem.value != 4)) ? (
           <BranchFilter setFilterObject={setFilterObject} filterObject={filterObject.educationTypes}/>
          ) : ""}
        </div>
        <div className="py-2 border-bottom ml-3">
          <h6 className="font-weight-bold">Alt Kategoriler</h6>
          <div id="orange">
            <span className="fa fa-minus"></span>
          </div>
          {filterItem && (filterItem.value == 3 || filterItem.value == 4) ? (
            <NovelSubCategories filterObject={filterObject.branches} setFilterObject={setFilterObject} />
          ) : (
            <BranchSubcategories setFilterObject={setFilterObject} filterObject={filterObject.branches}/>
          )}
        </div>
        <div className="py-2 ml-3">
          <h6 className="font-weight-bold">Fiyat Aralığı</h6>
          <div id="orange">
            <span className="fa fa-minus"></span>
          </div>
          <div id="price">
            <div className="middle">
              <div className="multi-range-slider">
                <input
                  type="range"
                  id="input-left"
                  min="0"
                  max="100"
                  value="10"
                  ref={inputLeft}
                />
                <input
                  type="range"
                  id="input-right"
                  min="0"
                  max="100"
                  value="50"
                  ref={inputRight}
                />
                <div className="slider">
                  <div className="track"></div>
                  <div ref={range} className="range"></div>
                  <div ref={thumbLeft} className="thumb left"></div>
                  <div ref={thumbRight} className="thumb right"></div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-2">
              <div>
                <span
                  ref={amountLeft}
                  id="amount-left"
                  className="font-weight-bold"
                ></span>{" "}
                TL
              </div>
              <div>
                <span
                  ref={amountRight}
                  id="amount-right"
                  className="font-weight-bold"
                ></span>{" "}
                TL
              </div>
            </div>
          </div>
        </div>
        <button type="button" className="btn btn-info" onClick={getFilteredProducts}>
          Getir
        </button>
      </section>
    </>
  );
}

export default Sidebar;
