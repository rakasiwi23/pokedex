import React, { useEffect, useState } from "react";
import { getListOfPokemon } from "../services/apis";
import { PokemonList } from "../type_definition";
import "../assets/css/app.css";
import pokedexImg from "../assets/images/pokedex.png";
import { padNumber } from "../utils";

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonList>();
  const [loadMore, setLoadMore] = useState<boolean>(true);

  useEffect(() => {
    const requestPokemons = async (loadMore: boolean) => {
      if (loadMore) {
        try {
          const nextUrl = pokemonList?.next || "";
          const prevResult = pokemonList?.results || [];

          const data = await getListOfPokemon(nextUrl);

          const newData = {
            ...data,
            results: [...prevResult, ...data.results],
          };

          setPokemonList(newData);
        } catch (error) {
          alert("Something went wrong!");
          console.error(error);
        }
      }
    };

    requestPokemons(loadMore);
    setLoadMore(false);
  }, [loadMore, pokemonList]);

  useEffect(() => {
    const list = document.getElementById("list") as HTMLElement;

    window.addEventListener("scroll", () => {
      if (
        window.scrollY + window.innerHeight ===
        list.clientHeight + list.offsetTop
      ) {
        setLoadMore(true);
      }
    });
  }, []);

  return (
    <div className="app">
      <h1 className="title">
        Pokédex <img src={pokedexImg} alt="" />
      </h1>

      <ul id="list" className="pokemons">
        {pokemonList?.results.map((pokemon) => {
          const { name: pokemonName, url } = pokemon;
          const pokemonId = url.split("/")[6];

          return (
            <li id={pokemonId} className="pokemon" key={pokemonName}>
              <span className="number">#{padNumber(Number(pokemonId), 3)}</span>

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
        })}
      </ul>
    </div>
  );
}

export default App;
