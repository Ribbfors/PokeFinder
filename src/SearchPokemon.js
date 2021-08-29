import Axios from "axios";
import React, { useState } from "react";
import "./SearchPokemon.css";

function PK() {
  const api = Axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
  });

  const [pokemonSearched, setPokemonSearched] = useState(false);
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState({
    name: null,
    height: null,
    weight: null,
    img: null,
    id: null,
    type: null,
    type2: null,
  });
  const [pokemonDescription, fetchDescription] = useState({});
  const [evolution, pokemonEvolution] = useState({});

  const searchPokemon = () => {
    api.get(`pokemon/${search}`.toLowerCase()).then((response) => {
      setPokemon({
        name: response.data.name,
        height: response.data.height,
        weight: response.data.weight,
        img: response.data.sprites.front_default,
        id: response.data.id,
        type: response.data.types[0].type.name,
        type2: response.data.types[1]?.type.name,
      });

      api.get(`pokemon-species/${response.data.id}/`).then((response) => {
        fetchDescription({
          entry: response.data.flavor_text_entries[0].flavor_text,
          evolution: response.data.evolution_chain.url,
        });
        api.get(`${response.data.evolution_chain.url}`).then((response) => {
          pokemonEvolution({
            evolution: response.data.chain.evolves_to[0]?.species.name,
          });
        });
      });
    });
    setPokemonSearched(true);
  };

  return (
    <div className="page">
      <div className="search-section">
        <input
          placeholder="Search..."
          type="text"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <button onClick={searchPokemon}>Search</button>
        <p>For example: Gengar</p>
      </div>
      <div className="main">
        {!pokemonSearched ? null : (
          <>
            <h1 style={{ textTransform: "capitalize" }}>{pokemon.name}</h1>
            <h1>No. {pokemon.id}</h1>
            <img src={pokemon.img} alt="" />

            <div className="info-wrapper">
              <div className="info">
                <h3 style={{ textTransform: "capitalize" }}>
                  Type: {pokemon.type} {pokemon.type2}
                </h3>
                <h3>Height: {pokemon.height * 10} Cm</h3>
                <h3>Weight: {pokemon.weight / 10} Kg</h3>
              </div>
            </div>

            <div className="desc">
              <div className="desc-info">
                <h3 style={{ textTransform: "capitalize" }}>
                  {pokemonDescription.entry}
                </h3>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default PK;
