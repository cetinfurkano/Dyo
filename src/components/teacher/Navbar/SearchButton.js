import React from "react";

function SearchButton({setSearchActive}) {
  
  const handleClick = (event) => {
    setSearchActive(true);
  };

  return (
    <a href="#" onClick={handleClick} className="search">
      <i className="fa fa-search" aria-hidden="true"></i>
    </a>
  );
}

export default SearchButton;
