import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FilterBar.css";

function FilterBar({ onFilter }) {
  const [generations, setGenerations] = useState([]);
  const [types, setTypes] = useState([]);
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/generation")
      .then((response) => setGenerations(response.data.results))
      .catch((error) => console.error("Error fetching generations: ", error));

    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((response) => setTypes(response.data.results))
      .catch((error) => console.error("Error fetching types: ", error));

    axios
      .get("https://pokeapi.co/api/v2/ability")
      .then((response) => setAbilities(response.data.results))
      .catch((error) => console.error("Error fetching abilities: ", error));
  }, []);

  const handleFilterChange = (filterType, value) => {
    onFilter(filterType, value);
  };

  return (
    <div className="filter-bar">
      <select
        onChange={(e) => handleFilterChange("generation", e.target.value)}
      >
        <option value="">All Generations</option>
        {generations.map((gen, index) => (
          <option key={index} value={gen.url}>
            {gen.name}
          </option>
        ))}
      </select>
      <select onChange={(e) => handleFilterChange("type", e.target.value)}>
        <option value="">All Types</option>
        {types.map((type, index) => (
          <option key={index} value={type.url}>
            {type.name}
          </option>
        ))}
      </select>
      <select onChange={(e) => handleFilterChange("ability", e.target.value)}>
        <option value="">All Abilities</option>
        {abilities.map((ability, index) => (
          <option key={index} value={ability.url}>
            {ability.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;
