import React from "react";
import FilterItem from "./FilterItem";

function BranchSubcategories({ filterObject, setFilterObject }) {
  const handleAddBranch = (e, filterId) => {
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
        filterName="Türkçe"
        setFilterObject={handleAddBranch}
        filterId={1}
        checkInclude={filterObject}
      />
      <FilterItem
        filterName="Matematik"
        setFilterObject={handleAddBranch}
        filterId={2}
        checkInclude={filterObject}
      />
      <FilterItem
        filterName="Yabancı Dil"
        setFilterObject={handleAddBranch}
        filterId={3}
        checkInclude={filterObject}
      />
      <FilterItem
        filterName="Fizik"
        setFilterObject={handleAddBranch}
        filterId={4}
        checkInclude={filterObject}
      />
      <FilterItem
        filterName="Kimya"
        setFilterObject={handleAddBranch}
        filterId={5}
        checkInclude={filterObject}
      />
      <FilterItem
        filterName="Biyoloji"
        setFilterObject={handleAddBranch}
        filterId={6}
        checkInclude={filterObject}
      />
      <FilterItem
        filterName="Tarih"
        setFilterObject={handleAddBranch}
        filterId={7}
        checkInclude={filterObject}
      />
    </form>
  );
}

export default BranchSubcategories;
