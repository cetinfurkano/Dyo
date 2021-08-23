import React from "react";
import FilterItem from "./FilterItem";

function BranchFilter({ filterObject, setFilterObject }) {
  const handleAddBranch = (e, filterId) => {
    if (e.target.checked == true) {
      setFilterObject((prev) => {
        var old = { ...prev };
        old.educationTypes.push(filterId);
        return old;
      });
    } else {
      setFilterObject((prev) => {
        var old = { ...prev };
        var index = old.educationTypes.findIndex((i) => i == filterId);
        old.educationTypes.splice(index, 1);
        console.log("old: " + JSON.stringify(old));
        return old;
      });
    }
  };

  return (
    <form>
      <FilterItem
        filterName="Lise"
        setFilterObject={handleAddBranch}
        filterId={1}
        checkInclude={filterObject}
      />
      <FilterItem
        filterName="İlkokul"
        setFilterObject={handleAddBranch}
        filterId={2}
        checkInclude={filterObject}
      />
      <FilterItem
        filterName="Ortaokul"
        setFilterObject={handleAddBranch}
        filterId={3}
        checkInclude={filterObject}
      />
      <FilterItem
        filterName="Okul Öncesi"
        setFilterObject={handleAddBranch}
        filterId={4}
        checkInclude={filterObject}
      />
    </form>
  );
}

export default BranchFilter;
