import React, { useState } from "react";
import FilterItem from "./FilterItem";

function NovelSubCategories({ filterObject, setFilterObject }) {
  const handleAddNovelItems = (e, filterId) => {
    if (e.target.checked == true) {
      setFilterObject((prev) => {
        var old = { ...prev };
        old.branches.push(filterId);
        return old;
      });
    } else {
      setFilterObject((prev) => {
       var old = {...prev};
       var index = old.branches.findIndex(i => i == filterId);
       old.branches.splice(index, 1);
       console.log("old: " + JSON.stringify(old));
       return old;
      });
    }

  };

  return (
    <form>
      <FilterItem
        filterName="Macera"
        setFilterObject={handleAddNovelItems}
        filterId={-1}
        checkInclude={filterObject}
      />
      <FilterItem
        filterName="Bilim Kurgu"
        setFilterObject={handleAddNovelItems}
        filterId={-2}
        checkInclude={filterObject}
      />
      <FilterItem
        filterName="Tarihi"
        setFilterObject={handleAddNovelItems}
        filterId={-3}
        checkInclude={filterObject}
      />
      <FilterItem
        filterName="Felsefi"
        setFilterObject={handleAddNovelItems}
        filterId={-4}
        checkInclude={filterObject}
      />
      <FilterItem
        filterName="Biyografi"
        setFilterObject={handleAddNovelItems}
        filterId={-5}
        checkInclude={filterObject}
      />
      <FilterItem
        filterName="Edebiyat"
        setFilterObject={handleAddNovelItems}
        filterId={-6}
        checkInclude={filterObject}
      />
    </form>
  );
}

export default NovelSubCategories;
