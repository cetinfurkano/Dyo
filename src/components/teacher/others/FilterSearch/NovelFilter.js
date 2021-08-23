import React from "react";
import FilterItem from "./FilterItem";


function NovelFilter({setFilterObject}) {
  return (
    <form>
      <FilterItem filterName="Roman" />
      <FilterItem filterName="Çizgi Roman" />
    </form>
  );
}

export default NovelFilter;
