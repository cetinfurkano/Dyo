import React, { useState,useRef } from "react";
import TeacherOperations from "../../logics/Teacher/TeacherOperations";
import {useHistory, Redirect} from "react-router-dom";

function SearchBar({ searchActive, setSearchActive }) {
  const history=useHistory();
  const searchIcon = useRef("");
  const searchBar = searchActive
    ? "search-bar search-bar-active"
    : "search-bar";

  const [searchText, setSearchText] = useState("");

  const handleClick = (e) => {
    if(searchIcon.current.className == "fa fa-times"){
      e.preventDefault();
      setSearchActive(false);
    }
    else{
      e.preventDefault();
      setSearchActive(false);
      history.push("/teacher?productName="+searchText);
    }
  };

  const handleChangeSearchText = (e) => {
   setSearchText(e.target.value)
   if(e.target.value != ""){
     searchIcon.current.className="fa fa-search";
   }else{
    searchIcon.current.className="fa fa-times";
   }
  }
    return (
    <div className={searchBar}>
      <div className="search-input">
        <input
          type="text"
          placeholder="Bir ürün ara"
          name="search"
          value={searchText}
          onChange={handleChangeSearchText}
        />

        <a href="#" onClick={handleClick} className="search-cancel">
          <i ref={searchIcon} className="fa fa-times" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
}

export default SearchBar;
