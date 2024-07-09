import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PokemonCard.css";

function PokemonCard({ name, url }) {
  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get(url)
      .then((response) => setImage(response.data.sprites.front_default))
      .catch((error) => console.error("Error fetching image: ", error));
  }, [url]);

  return (
    <div className="pokemon-card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
    </div>
  );
}

export default PokemonCard;
