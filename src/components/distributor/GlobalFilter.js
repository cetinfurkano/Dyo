import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

function GlobalFilter({ filter, setFilter }) {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);

  return (
    <div className="col-sm-8 add_flex">
      <div className="form-group searchInput">
        <label htmlFor="filterbox">Ara:</label>
        <input
          type="search"
          className="form-control"
          id="filterbox"
          name="filterbox"
          placeholder=" "
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default GlobalFilter;
