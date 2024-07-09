import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonList from "./components/PokemonList";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import SortBar from "./components/SortBar";
import "./styles.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    generation: "",
    type: "",
    ability: "",
  });
  const [sortCriteria, setSortCriteria] = useState("pokedex");

  useEffect(() => {
    fetchAllPokemon();
  }, [filters]);

  const fetchAllPokemon = async () => {
    let url = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
    let allPokemon = [];

    while (url) {
      const response = await axios.get(url);
      allPokemon = allPokemon.concat(response.data.results);
      url = response.data.next;
    }

    const pokemonDetails = await Promise.all(
      allPokemon.map((poke) => axios.get(poke.url))
    );

    const pokemonData = pokemonDetails.map((res) => res.data);
    setPokemon(pokemonData);
  };

  const fetchFilteredData = async (filterType, value) => {
    if (!value) {
      await fetchAllPokemon();
      return;
    }

    const response = await axios.get(value);

    if (filterType === "generation") {
      const promises = response.data.pokemon_species.map((species) =>
        axios.get(species.url)
      );
      const results = await Promise.all(promises);
      const pokemonData = results.map((res) => ({
        name: res.data.name,
        id: res.data.id,
        sprites: res.data.sprites,
        height: res.data.height,
        weight: res.data.weight,
        url: `https://pokeapi.co/api/v2/pokemon/${res.data.id}/`,
      }));
      setPokemon(pokemonData);
    } else {
      const promises = response.data.pokemon.map((poke) =>
        axios.get(poke.pokemon.url)
      );
      const results = await Promise.all(promises);
      const pokemonData = results.map((res) => ({
        name: res.data.name,
        id: res.data.id,
        sprites: res.data.sprites,
        height: res.data.height,
        weight: res.data.weight,
        url: `https://pokeapi.co/api/v2/pokemon/${res.data.id}/`,
      }));
      setPokemon(pokemonData);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (filterType, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
    fetchFilteredData(filterType, value);
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  const sortPokemon = (pokemonList) => {
    switch (sortCriteria) {
      case "name-asc":
        return pokemonList.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return pokemonList.sort((a, b) => b.name.localeCompare(a.name));
      case "height":
        return pokemonList.sort((a, b) => a.height - b.height);
      case "weight":
        return pokemonList.sort((a, b) => a.weight - b.weight);
      case "pokedex":
      default:
        return pokemonList.sort((a, b) => a.id - b.id);
    }
  };

  const filteredPokemon = sortPokemon(
    pokemon.filter((poke) =>
      poke.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="App">
      <h1>Pokemon Database</h1>
      <SearchBar onSearch={handleSearch} />
      <FilterBar onFilter={handleFilter} />
      <SortBar onSort={handleSort} />
      <PokemonList pokemon={filteredPokemon} sortCriteria={sortCriteria} />
      <footer>
        <a href="placeholder">View on GitHub</a>
      </footer>
    </div>
  );
}

export default App;
