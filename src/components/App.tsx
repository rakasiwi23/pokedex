import React, { useEffect, useState, ChangeEvent } from "react";
import { getListOfPokemon, getPokemonByType } from "../apis";
import { PokemonList } from "../type_definition";
import "../assets/css/app.css";
import pokedexImg from "../assets/images/pokedex.png";
import { padNumber } from "../utils";
import PokemonDetail from "./PokemonDetail";

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonList>();
  const [loadMore, setLoadMore] = useState<boolean>(true);
  const [showDetail, setShowDetail] = useState<{
    isOpen: boolean;
    pokemonId: string;
    pokemonName: string;
  }>({ isOpen: false, pokemonId: "", pokemonName: "" });
  const [isOnFilterMode, setIsOnFilterMode] = useState<boolean>(false);

  useEffect(() => {
    const requestPokemons = async (loadMore: boolean) => {
      if (loadMore && isOnFilterMode === false) {
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
  }, [loadMore, pokemonList, isOnFilterMode]);

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

  const onShowDetail = (id: string, name: string) => {
    setShowDetail({ isOpen: true, pokemonId: id, pokemonName: name });
  };

  const onHideDetail = () => {
    setShowDetail({ isOpen: false, pokemonId: "", pokemonName: "" });
  };

  const onChangeType = async (e: ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;

    if (type !== "") {
      const response = await getPokemonByType(type);
      const pokemonList: { name: string; url: string }[] = [];
      response.pokemon.forEach((p) => {
        pokemonList.push(p.pokemon);
      });

      setIsOnFilterMode(true);
      setPokemonList((prevState) => {
        const finalPokemonList: PokemonList = {
          count: prevState!.count,
          next: prevState!.next,
          previous: prevState!.previous,
          results: [...pokemonList],
        };

        return finalPokemonList;
      });
    } else {
      const data = await getListOfPokemon("");

      setIsOnFilterMode(false);
      setPokemonList(data);
    }
  };

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
            <li
              id={pokemonId}
              className="pokemon"
              key={pokemonName}
              onClick={onShowDetail.bind(null, pokemonId, pokemonName)}
            >
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

      <div id="filter" className="filter-wrapper">
        <span>Filter Pokemon by Type:</span>
        <select onChange={onChangeType}>
          <option value="">-</option>
          <option value="normal">Normal</option>
          <option value="fighting">Fighting</option>
          <option value="flying">Flying</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="rock">Rock</option>
          <option value="bug">Bug</option>
          <option value="ghost">Ghost</option>
          <option value="steel">Steel</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="fairy">Fairy</option>
        </select>
      </div>

      {showDetail.isOpen && (
        <PokemonDetail
          pokemonId={showDetail.pokemonId}
          pokemonName={showDetail.pokemonName}
          onHideDetail={onHideDetail}
        />
      )}
    </div>
  );
}

export default App;
