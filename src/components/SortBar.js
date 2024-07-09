import React from "react";
import "./SortBar.css";

function SortBar({ onSort }) {
  return (
    <div className="sort-bar">
      <label>Sort by: </label>
      <select onChange={(e) => onSort(e.target.value)}>
        <option value="pokedex">Pokedex Entry</option>
        <option value="name-asc">A-Z</option>
        <option value="name-desc">Z-A</option>
        <option value="height">Height</option>
        <option value="weight">Weight</option>
      </select>
    </div>
  );
}

export default SortBar;
