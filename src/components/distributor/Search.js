import React from "react";

function Search() {
  return (
    <div className="search" style={{ width: "40%" }}>
      <form className="form-inline" style={{ width: "100%" }}>
        <div className="input-group mt-2" style={{ width: "inherit" }}>
          <input type="text" className="form-control" placeholder="Ara" />
          <div className="input-group-append">
            <button type="button" className="btn btn-warning">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Search;
