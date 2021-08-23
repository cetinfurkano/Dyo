import React from "react";

function FilterItem({filterName, setFilterObject,filterId, checkInclude}) {
  const handleChange = (e) => {
    setFilterObject(e, filterId);
  }
      
  return (
    <div className="form-group">
      <input type="checkbox" id={filterName} onChange={handleChange}  />
      <label htmlFor={filterName}>{filterName}</label>
    </div>
  );
}

export default FilterItem;
