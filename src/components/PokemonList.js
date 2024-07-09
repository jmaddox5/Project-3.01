import React from "react";
import "./PokemonList.css";

function PokemonList({ pokemon, sortCriteria }) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="pokemon-list">
      {pokemon.map((poke, index) => (
        <div key={index} className="pokemon-item">
          <img src={poke.sprites.front_default} alt={poke.name} />
          <h2 className="pokemon-name">{capitalizeFirstLetter(poke.name)}</h2>
          <p>Pokedex Entry: {poke.id}</p>
          {(sortCriteria === "height" || sortCriteria === "weight") && (
            <>
              {sortCriteria === "height" && <p>Height: {poke.height}</p>}
              {sortCriteria === "weight" && <p>Weight: {poke.weight}</p>}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default PokemonList;
