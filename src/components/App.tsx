import React, { useEffect, useState } from "react";
import { getListOfPokemon } from "../services/apis";
import { PokemonList } from "../type_definition";
import "../assets/css/app.css";
import pokedexImg from "../assets/images/pokedex.png";

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonList | undefined>(
    undefined,
  );
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const requestPokemons = async () => {
      try {
        setIsFetching(true);
        const response = await getListOfPokemon("");
        setPokemonList(response);
      } catch (error) {
        console.error(error);
        alert("Something went wrong!");
      } finally {
        setIsFetching(false);
      }
    };

    requestPokemons();
  }, []);

  return (
    <div className="app">
      <h1 className="title">
        Pokédex <img src={pokedexImg} alt="" />
      </h1>

      <ul id="list" className="pokemons">
        {isFetching === false ? (
          pokemonList?.results.map((pokemon) => {
            const { name: pokemonName, url } = pokemon;
            const pokemonId = url.split("/")[6];

            return (
              <li id={pokemonId} className="pokemon" key={pokemonName}>
                <div className="image-wrapper">
                  <img
                    src={`https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png`}
                    alt=""
                  />
                </div>

                <span data-testid="pokemon-name" className="name">
                  {pokemonName}
                </span>
              </li>
            );
          })
        ) : (
          <div>Loading....</div>
        )}
      </ul>
    </div>
  );
}

export default App;
